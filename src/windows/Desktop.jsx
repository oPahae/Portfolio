import React, { useState, useEffect, useRef } from 'react';
import { desktopApps, desktopFolders } from '@/utils/apps';
import { useRouter } from 'next/router';
import JSZip from 'jszip';

const Desktop = ({ page, setPage, __SPEECH__ }) => {
    const router = useRouter();
    const { safeMode } = router.query;
    const [items, setItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [dragging, setDragging] = useState(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [contextMenu, setContextMenu] = useState(null);
    const [itemContextMenu, setItemContextMenu] = useState(null);
    const [selecting, setSelecting] = useState(false);
    const [selectionStart, setSelectionStart] = useState(null);
    const [selectionBox, setSelectionBox] = useState(null);
    const [iconSize, setIconSize] = useState('medium');
    const [renamingItemId, setRenamingItemId] = useState(null);
    const [renameValue, setRenameValue] = useState('');
    const desktopRef = useRef(null);
    const db = useRef(null);

    const GRID_SIZE = 105;
    const ICON_SIZES = {
        small: { icon: 'w-8 h-8', text: 'text-[10px]' },
        medium: { icon: 'w-12 h-12', text: 'text-xs' },
        large: { icon: 'w-16 h-16', text: 'text-sm' }
    };

    useEffect(() => setSelectedItems([]), [page])

    useEffect(() => {
        initDB();
        const savedSize = localStorage.getItem('iconSize');
        if (savedSize) setIconSize(savedSize);
    }, []);

    const initDB = async () => {
        const request = indexedDB.open('DesktopDB', 1);

        request.onerror = () => console.error('Database error');

        request.onsuccess = (e) => {
            db.current = e.target.result;
            loadItems();
        };

        request.onupgradeneeded = (e) => {
            const database = e.target.result;
            if (!database.objectStoreNames.contains('items')) {
                const objectStore = database.createObjectStore('items', { keyPath: 'id' });
                objectStore.createIndex('type', 'type', { unique: false });
                objectStore.createIndex('path', 'path', { unique: false });
            }
        };
    };

    const loadItems = () => {
        const transaction = db.current.transaction(['items'], 'readonly');
        const objectStore = transaction.objectStore('items');
        const request = objectStore.getAll();

        request.onsuccess = (e) => {
            const allItems = e.target.result.map(item => {
                if (isNaN(item.gridX) || isNaN(item.gridY)) {
                    const empty = findEmptyPosition();
                    const newItem = {
                        ...item,
                        gridX: empty.x,
                        gridY: empty.y,
                    }
                    return newItem;
                }
                return item;
            });
            const desktopItems = allItems.filter(item => {
                if (item.type === 'folder') {
                    return item.ppath === 'C:/Users/pahae/desktop';
                }
                else return item.path === 'C:/Users/pahae/desktop';
            });

            const appsWithPositions = desktopApps.map((app, index) => {
                const saved = allItems.find(i => i.id === app.id && i.type === 'app');
                return {
                    ...app,
                    type: 'app',
                    gridX: saved?.gridX ?? (index % 2),
                    gridY: saved?.gridY ?? Math.floor(index / 2)
                };
            });

            const foldersWithPositions = desktopFolders.map((folder, index) => {
                const saved = allItems.find(i => i.id === folder.id && i.type === 'myfolder');
                return {
                    ...folder,
                    type: 'myfolder',
                    gridX: saved?.gridX ?? 11,
                    gridY: saved?.gridY ?? index
                };
            });

            setItems([...appsWithPositions, ...foldersWithPositions, ...desktopItems]);
        };
    };

    const saveItem = (item) => {
        const transaction = db.current.transaction(['items'], 'readwrite');
        const objectStore = transaction.objectStore('items');
        objectStore.put(item);
    };

    const deleteItem = (id) => {
        const transaction = db.current.transaction(['items'], 'readwrite');
        const objectStore = transaction.objectStore('items');

        const getRequest = objectStore.get(id);
        getRequest.onsuccess = (e) => {
            const item = e.target.result;
            if (!item) return;

            const getAllRequest = objectStore.getAll();
            getAllRequest.onsuccess = (event) => {
                const allItems = event.target.result;

                let toMove = new Set();
                let queue = [];

                toMove.add(item.id);
                if (item.type === 'folder') queue.push(item.path);

                while (queue.length > 0) {
                    const parentPath = queue.shift();

                    const children = allItems.filter(
                        (child) =>
                            (child.ppath && child.ppath === parentPath) ||
                            (child.path && child.path === parentPath)
                    );

                    for (const child of children) {
                        if (!toMove.has(child.id)) {
                            toMove.add(child.id);
                            if (child.type === 'folder') queue.push(child.path);
                        }
                    }
                }

                const BIN_PATH = 'C:/Users/pahae/bin';
                const originalParent = item.ppath;

                toMove.forEach((moveId) => {
                    const childReq = objectStore.get(moveId);
                    childReq.onsuccess = (ev) => {
                        const child = ev.target.result;
                        if (!child) return;

                        // Calcul du chemin relatif par rapport au dossier supprimé
                        let relativePath = '';
                        if (child.path && originalParent && child.path.startsWith(originalParent)) {
                            relativePath = child.path.slice(originalParent.length);
                            if (relativePath.startsWith('/')) relativePath = relativePath.slice(1);
                        }

                        // Nouveau chemin dans la corbeille
                        const newPath = `${BIN_PATH}/${relativePath}`;
                        const newParent = newPath.substring(0, newPath.lastIndexOf('/')) || BIN_PATH;

                        child.path = newPath;
                        child.ppath = newParent;

                        objectStore.put(child);
                    };
                });

                // Mettre à jour la vue locale
                setItems((prev) => prev.filter((i) => !toMove.has(i.id)));
                setSelectedItems((prev) => prev.filter((sid) => !toMove.has(sid)));
            };
        };
    };

    const getNextFileName = (baseName) => {
        const existing = items.filter(i => i.name && i.name.startsWith(baseName));
        if (existing.length === 0) return baseName;

        let counter = 1;
        while (existing.some(i => i.name === `${baseName} (${counter})`)) {
            counter++;
        }
        return `${baseName} (${counter})`;
    };

    const createFile = () => {
        const name = getNextFileName('Nouveau document texte');
        const newFile = {
            id: `file_${Date.now()}`,
            type: 'file',
            name,
            path: 'C:/Users/pahae/desktop',
            content: '',
            icon: '/app_icons/file.png',
            gridX: 0,
            gridY: 0
        };

        const emptyPos = findEmptyPosition();
        newFile.gridX = emptyPos.x;
        newFile.gridY = emptyPos.y;

        saveItem(newFile);
        setItems([...items, newFile]);
        setContextMenu(null);
        setRenamingItemId(newFile.id);
    };

    const createFolder = () => {
        const name = getNextFileName('Nouveau dossier');
        const newFolder = {
            id: `folder_${Date.now()}`,
            type: 'folder',
            name,
            path: `C:/Users/pahae/desktop/${name}`,
            ppath: 'C:/Users/pahae/desktop',
            icon: '/app_icons/folder.png',
            gridX: 0,
            gridY: 0
        };

        const emptyPos = findEmptyPosition();
        newFolder.gridX = emptyPos.x;
        newFolder.gridY = emptyPos.y;

        saveItem(newFolder);
        setItems([...items, newFolder]);
        setContextMenu(null);
        setRenamingItemId(newFolder.id);
    };

    const findEmptyPosition = () => {
        for (let y = 0; y < 20; y++) {
            for (let x = 0; x < 12; x++) {
                if (!items.some(item => item.gridX === x && item.gridY === y)) {
                    return { x, y };
                }
            }
        }
        return { x: 0, y: 0 };
    };

    const handleMouseDown = (e, item) => {
        if (e.button === 2) return;

        e.stopPropagation();

        if (!selectedItems.includes(item.id)) {
            if (e.ctrlKey) {
                setSelectedItems([...selectedItems, item.id]);
            } else {
                setSelectedItems([item.id]);
            }
        }

        setDragging(item.id);
        const rect = e.currentTarget.getBoundingClientRect();
        setDragOffset({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    const handleMouseMove = (e) => {
        if (dragging) {
            const rect = desktopRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left - dragOffset.x;
            const y = e.clientY - rect.top - dragOffset.y;

            const gridX = Math.max(0, Math.min(11, Math.round(x / GRID_SIZE)));
            const gridY = Math.max(0, Math.floor(y / GRID_SIZE));

            const draggedItems = selectedItems.length > 1 && selectedItems.includes(dragging)
                ? selectedItems
                : [dragging];

            const draggedItem = items.find(i => i.id === dragging);
            const offsetX = gridX - draggedItem?.gridX;
            const offsetY = gridY - draggedItem?.gridY;

            setItems(prevItems => {
                const updatedItems = prevItems.map(item => {
                    if (draggedItems.includes(item.id)) {
                        const newX = Math.max(0, Math.min(11, item.gridX + offsetX));
                        const newY = Math.max(0, item.gridY + offsetY);
                        return { ...item, gridX: newX, gridY: newY };
                    }
                    return item;
                });

                const occupied = new Map();
                draggedItems.forEach(id => {
                    const item = updatedItems.find(i => i.id === id);
                    if (item) {
                        const key = `${item.gridX},${item.gridY}`;
                        occupied.set(key, id);
                    }
                });

                return updatedItems.map(item => {
                    if (draggedItems.includes(item.id)) return item;

                    const key = `${item.gridX},${item.gridY}`;
                    if (occupied.has(key)) {
                        if (item.type !== 'folder' && item.type !== 'myfolder') {
                            const newPos = findEmptyPositionExcluding(updatedItems, draggedItems);
                            return { ...item, gridX: newPos.x, gridY: newPos.y };
                        }
                        draggedItems.forEach(dragged => {
                            moveFolder(items.find(i => i.id === dragged), item);
                        })
                    }
                    return item;
                });
            });
        } else if (selecting && selectionStart) {
            const rect = desktopRef.current.getBoundingClientRect();
            const currentX = e.clientX - rect.left;
            const currentY = e.clientY - rect.top;

            setSelectionBox({
                left: Math.min(selectionStart.x, currentX),
                top: Math.min(selectionStart.y, currentY),
                width: Math.abs(currentX - selectionStart.x),
                height: Math.abs(currentY - selectionStart.y)
            });

            const selected = items.filter(item => {
                const itemX = item.gridX * GRID_SIZE;
                const itemY = item.gridY * GRID_SIZE;
                const itemRight = itemX + GRID_SIZE;
                const itemBottom = itemY + GRID_SIZE;

                const boxLeft = Math.min(selectionStart.x, currentX);
                const boxTop = Math.min(selectionStart.y, currentY);
                const boxRight = boxLeft + Math.abs(currentX - selectionStart.x);
                const boxBottom = boxTop + Math.abs(currentY - selectionStart.y);

                return !(itemRight < boxLeft || itemX > boxRight || itemBottom < boxTop || itemY > boxBottom);
            }).map(item => item.id);

            setSelectedItems(selected);
        }
    };

    const handleMouseUp = () => {
        if (dragging) {
            items.forEach(item => {
                const stored = item.previousGrid || {};
                if (item.gridX !== stored.x || item.gridY !== stored.y) {
                    saveItem(item);
                }
            });
        }

        setDragging(null);
        setSelecting(false);
        setSelectionStart(null);
        setSelectionBox(null);
    };

    const findEmptyPositionExcluding = (allItems, excludeIds) => {
        for (let y = 0; y < 20; y++) {
            for (let x = 0; x < 12; x++) {
                if (!allItems.some(item => !excludeIds.includes(item.id) && item.gridX === x && item.gridY === y)) {
                    return { x, y };
                }
            }
        }
        return { x: 0, y: 0 };
    };

    const handleDesktopMouseDown = (e) => {
        if (e.button === 0 && e.target === desktopRef.current) {
            setSelectedItems([]);
            const rect = desktopRef.current.getBoundingClientRect();
            setSelectionStart({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
            setSelecting(true);
        }
    };

    const handleContextMenu = (e) => {
        e.preventDefault();
        setContextMenu({ x: e.clientX, y: e.clientY });
        setItemContextMenu(null);
    };

    const handleItemContextMenu = (e, item) => {
        e.preventDefault();
        e.stopPropagation();
        setItemContextMenu({ x: e.clientX, y: e.clientY, item });
        setContextMenu(null);
    };

    const handleItemClick = (item) => {
        if (item.type === 'app') {
            setPage(item.id);
        } else if (item.type === 'folder') {
            localStorage.setItem('currentFolder', item.path);
            setPage('Folder');
        } else {
            localStorage.setItem('currentFile', `${item.path}/${item.name}`);
            if (item.type === 'file') setPage('File');
            if (item.type === 'image') setPage('Image Viewer');
            if (item.type === 'video') setPage('Video Player');
            if (item.type === 'audio') setPage('Audio Player');
            if (item.type === 'pdf') setPage('PDF Reader');
            if (item.type === 'myfolder') setPage(item.name);
        }
    };

    const handleDelete = (item) => {
        if (item.type === 'app' || item.type === 'myfolder') {
            alert('Vous avez besoin de droits administrateur pour supprimer cette application');
            return;
        }

        deleteItem(item.id);
        setItems(items.filter(i => i.id !== item.id));
        setSelectedItems(selectedItems.filter(id => id !== item.id));
        setItemContextMenu(false);
    };

    const handleItemRename = (item) => {
        if (item.type === 'app' || item.type === 'myfolder') {
            alert("Vous avez besoin de droits administrateur pour renommer cette application");
            return;
        }

        setRenamingItemId(item.id);
        setRenameValue(item.name);
        setItemContextMenu(null);
    };

    const finishRename = (item) => {
        const newName = renameValue.trim();
        if (!newName || newName === item.name) {
            setRenamingItemId(null);
            return;
        }

        const oldPath = item.path;
        const newPath = `C:/Users/pahae/desktop/${newName}`;

        const updatedItem = { ...item, name: newName, path: item.type === 'folder' ? newPath : oldPath };
        saveItem(updatedItem);

        if (item.type === 'folder') {
            const transaction = db.current.transaction(['items'], 'readwrite');
            const objectStore = transaction.objectStore('items');
            const getAllRequest = objectStore.getAll();

            getAllRequest.onsuccess = (e) => {
                const allItems = e.target.result;

                const childrenToUpdate = allItems.filter(
                    (child) =>
                        child.ppath?.startsWith(oldPath) ||
                        child.path?.startsWith(oldPath)
                );

                childrenToUpdate.forEach((child) => {
                    const updatedChild = { ...child };

                    if (updatedChild.path && updatedChild.path.startsWith(oldPath)) {
                        updatedChild.path = updatedChild.path.replace(oldPath, newPath);
                    }
                    if (updatedChild.ppath && updatedChild.ppath.startsWith(oldPath)) {
                        updatedChild.ppath = updatedChild.ppath.replace(oldPath, newPath);
                    }

                    objectStore.put(updatedChild);
                });

                setItems((prevItems) =>
                    prevItems.map((i) => {
                        if (i.id === item.id) return updatedItem;
                        const match = childrenToUpdate.find((c) => c.id === i.id);
                        return match ? { ...i, path: match.path, ppath: match.ppath } : i;
                    })
                );
            };
        } else {
            setItems((prevItems) =>
                prevItems.map((i) => (i.id === item.id ? updatedItem : i))
            );
        }

        setRenamingItemId(null);
        setRenameValue('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Delete' && selectedItems.length > 0) {
            selectedItems.forEach(id => {
                const item = items.find(i => i.id === id);
                if (item && item.type !== 'app') {
                    handleDelete(item);
                } else if (item && (item.type === 'app' || item.type === 'myfolder')) {
                    alert('Vous avez besoin de droits administrateur pour supprimer cette application');
                }
            });
        }
        if (e.key === 'F2' && selectedItems.length > 0) {
            selectedItems.forEach(id => {
                const item = items.find(i => i.id === id);
                if (item && item.type !== 'app') {
                    handleItemRename(item);
                } else if (item && (item.type === 'app' || item.type === 'myfolder')) {
                    alert('Vous avez besoin de droits administrateur pour modifier cette application');
                }
            });
        }
        if (e.key === 'Enter' && selectedItems.length > 0) {
            selectedItems.forEach(id => {
                const item = items.find(i => i.id === id);
                handleItemClick(item);
            });
        }
    };

    const handleRefresh = () => {
        setItems([]);
        loadItems();
        setContextMenu(null);
    };

    const handleIconSizeChange = (size) => {
        setIconSize(size);
        localStorage.setItem('iconSize', size);
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [dragging, selecting, selectionStart, items, selectedItems]);

    useEffect(() => {
        const handleClick = () => {
            setContextMenu(null);
            setItemContextMenu(null);
        };
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, []);

    const handleDrop = (e) => {
        e.preventDefault();
        const currentPath = 'C:/Users/pahae/desktop';

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const files = Array.from(e.dataTransfer.files);

            files.forEach((file) => {
                const reader = new FileReader();

                reader.onload = (event) => {
                    const content = event.target.result || '';
                    let type = 'file';
                    if (file.type.startsWith('image/')) type = 'image';
                    else if (file.type.startsWith('video/')) type = 'video';
                    else if (file.type.startsWith('audio/')) type = 'audio';
                    else if (file.type === 'application/pdf') type = 'pdf';

                    const emptyPos = findEmptyPosition();

                    const newFile = {
                        gridX: emptyPos.x,
                        gridY: emptyPos.y,
                        id: `${type}_${Date.now()}_${file.name}`,
                        type,
                        name: file.name,
                        path: currentPath,
                        content,
                        icon: getTypeIcon({ content, type })
                    };

                    saveItem(newFile);
                    setItems((prev) => [...prev, newFile]);
                };

                if (file.type.startsWith('text/') || file.type === '') reader.readAsText(file);
                else reader.readAsDataURL(file);
            });

            return;
        }

        const data = e.dataTransfer.getData('text/plain');
        try {
            const droppedItem = JSON.parse(data);

            if (droppedItem.type === 'file') {
                const updatedItem = { ...droppedItem, path: currentPath };
                saveItem(updatedItem);
                setItems([...items, updatedItem]);
            } else if (droppedItem.type === 'folder') {
                const updatedItem = {
                    ...droppedItem,
                    ppath: currentPath,
                    path: `${currentPath}/${droppedItem.name}`,
                };
                saveItem(updatedItem);
                setItems([...items, updatedItem]);
            }
        } catch (error) {
            console.error('Erreur lors du drop JSON:', error, data);
        }
    };

    const moveFolder = (draggedItem, targetFolder) => {
        if (draggedItem.id === targetFolder.id) return;

        const transaction = db.current.transaction(['items'], 'readwrite');
        const objectStore = transaction.objectStore('items');
        const getAllRequest = objectStore.getAll();

        if (draggedItem.type !== 'folder') {
            const updatedItem = { ...draggedItem, path: targetFolder.path };
            objectStore.put(updatedItem);
            loadItems();
            return;
        }

        if (targetFolder.path && targetFolder.path.startsWith(draggedItem.path + '/')) {
            alert("Impossible de déplacer un dossier dans l'un de ses sous-dossiers");
            return;
        }

        getAllRequest.onsuccess = (e) => {
            const allItems = e.target.result;

            const oldPath = draggedItem.path;
            const newPath = `${targetFolder.path}/${draggedItem.name}`;
            const newPPath = targetFolder.path;

            const updatedDraggedItem = {
                ...draggedItem,
                path: newPath,
                ppath: newPPath
            };
            objectStore.put(updatedDraggedItem);

            const updateChildren = (parentPath, newParentPath) => {
                const children = allItems.filter(
                    (item) =>
                        (item.ppath && item.ppath === parentPath) ||
                        (item.path && item.path === parentPath && item.type !== 'folder')
                );

                children.forEach((child) => {
                    const updatedChild = { ...child };

                    if (child.type === 'folder') {
                        const oldChildPath = child.path;
                        const newChildPath = `${newParentPath}/${child.name}`;

                        updatedChild.path = newChildPath;
                        updatedChild.ppath = newParentPath;

                        objectStore.put(updatedChild);

                        updateChildren(oldChildPath, newChildPath);
                    } else {
                        updatedChild.path = newParentPath;
                        objectStore.put(updatedChild);
                    }
                });
            };

            updateChildren(oldPath, newPath);

            transaction.oncomplete = () => {
                loadItems();
            };
        };

        getAllRequest.onerror = () => {
            console.error("Erreur lors de la récupération des items");
        };
    };

    const getTypeIcon = (item) => {
        let icon = "";
        switch (item.type) {
            case 'folder': icon = "/app_icons/folder.png"; break;
            case 'file': icon = "/app_icons/file.png"; break;
            case 'image': icon = item.content; break;
            case 'video': icon = "/app_icons/video.png"; break;
            case 'audio': icon = "/app_icons/audio.png"; break;
            case 'myfolder': icon = "/app_icons/folder.png"; break;
        }
        return icon;
    }

    const downloadFolderAsZip = async (folder) => {
        const transaction = db.current.transaction(['items'], 'readonly');
        const objectStore = transaction.objectStore('items');
        const getAllRequest = objectStore.getAll();

        getAllRequest.onsuccess = async (e) => {
            const allItems = e.target.result;
            const zip = new JSZip();

            const addToZip = (parentPath, zipFolder) => {
                const children = allItems.filter((item) => {
                    if (item.type === 'folder') {
                        return item.ppath === parentPath;
                    }
                    return item.path === parentPath;
                });

                children.forEach((child) => {
                    if (child.type === 'folder') {
                        const subFolder = zipFolder.folder(child.name);
                        addToZip(child.path, subFolder);
                    } else if (child.type === 'file') {
                        zipFolder.file(child.name, child.content || '');
                    } else if (child.type === 'image' || child.type === 'video' || child.type === 'audio' || child.type === 'pdf') {
                        try {
                            const base64Data = child.content.includes(',')
                                ? child.content.split(',')[1]
                                : child.content;
                            zipFolder.file(child.name, base64Data, { base64: true });
                        } catch (error) {
                            console.error(`Erreur lors de l'ajout de ${child.name}:`, error);
                        }
                    }
                });
            };
            addToZip(folder.path, zip);

            try {
                const blob = await zip.generateAsync({ type: 'blob' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${folder.name}.zip`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                setItemContextMenu(null);
            } catch (error) {
                console.error('Erreur lors de la création du ZIP:', error);
                alert('Erreur lors de la création du fichier ZIP');
            }
        };

        getAllRequest.onerror = () => {
            console.error("Erreur lors de la récupération des items");
            alert('Erreur lors de la récupération des fichiers');
        };
    };

    return (
        <div
            ref={desktopRef}
            className='fixed top-0 left-0 w-full h-full p-8'
            onContextMenu={handleContextMenu}
            onMouseDown={handleDesktopMouseDown}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            style={{ cursor: selecting ? 'crosshair' : 'default' }}
        >
            {items.map(item => (
                <div
                    key={item.id}
                    className={`absolute flex justify-center items-center flex-col gap-2 m-2 w-fit h-fit cursor-pointer hover:bg-blue-500/20 duration-100 ${selectedItems.includes(item.id) ? 'bg-blue-500/40 border-1 border-blue-500' : ''
                        }`}
                    style={{
                        left: `${item.gridX * GRID_SIZE}px`,
                        top: `${item.gridY * GRID_SIZE}px`,
                        width: `${GRID_SIZE}px`
                    }}
                    onMouseDown={(e) => handleMouseDown(e, item)}
                    onContextMenu={(e) => handleItemContextMenu(e, item)}
                    onDoubleClick={() => handleItemClick(item)}
                    draggable="false"
                >
                    {item.icon && typeof item.icon === 'string' ? (
                        <img
                            src={item.icon}
                            alt={item.title}
                            className={`${ICON_SIZES[iconSize].icon} shadow-xl ${!dragging || dragging !== item.id ? 'hover:-translate-y-3 duration-200' : ''}`}
                            draggable="false"
                        />
                    ) : (
                        <div className={`${ICON_SIZES[iconSize].icon} flex items-center justify-center text-4xl`}>
                            {item.icon}
                        </div>
                    )}
                    <p className={`${ICON_SIZES[iconSize].text} text-white font-semibold text-center px-1 break-words max-w-full`}>
                        {renamingItemId === item.id ? (
                            <textarea
                                value={renameValue}
                                autoFocus
                                onFocus={(e) => e.target.select()}
                                onChange={(e) => setRenameValue(e.target.value)}
                                onBlur={() => finishRename(item)}
                                onKeyDown={(e) => {
                                    e.stopPropagation();
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        finishRename(item);
                                    }
                                    if (e.key === 'Escape') {
                                        e.preventDefault();
                                        setRenamingItemId(null);
                                    }
                                }}
                                className="text-white font-semibold text-center px-1 w-full"
                            />
                        ) : (
                            item.name ?
                                item.name.length > 13 ? item.name.slice(0, 9) + '...' : item.name
                                :
                                item.title ?
                                    item.title.length > 13 ? item.title.slice(0, 9) + '...' : item.title
                                    :
                                    ''
                        )}
                    </p>
                </div>
            ))}

            {selectionBox && (
                <div
                    className='absolute border-1 border-blue-500 bg-blue-500/20 pointer-events-none'
                    style={{
                        left: `${selectionBox.left}px`,
                        top: `${selectionBox.top}px`,
                        width: `${selectionBox.width}px`,
                        height: `${selectionBox.height}px`
                    }}
                />
            )}

            {contextMenu && (
                <div
                    className="absolute bg-black/20 backdrop-blur-xs text-gray-100 rounded-lg shadow-xl py-1 z-50 min-w-[180px] border border-gray-700"
                    style={{ left: `${contextMenu.x}px`, top: `${contextMenu.y}px` }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Affichage Submenu */}
                    <div className="relative group">
                        <div className="px-4 py-2 hover:bg-gray-800 cursor-pointer flex justify-between items-center transition-colors duration-200">
                            Affichage
                            <span className="ml-auto text-white text-xl">›</span>
                        </div>
                        <div className="absolute left-[105%] top-0 bg-black/20 backdrop-blur-xs rounded-lg shadow-xl py-1 border border-gray-700 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">
                            <div
                                className="px-4 py-2 hover:bg-gray-800 cursor-pointer whitespace-nowrap transition-colors duration-150"
                                onClick={() => handleIconSizeChange('small')}
                            >
                                Petites icônes
                            </div>
                            <div
                                className="px-4 py-2 hover:bg-gray-800 cursor-pointer whitespace-nowrap transition-colors duration-150"
                                onClick={() => handleIconSizeChange('medium')}
                            >
                                Icônes moyennes
                            </div>
                            <div
                                className="px-4 py-2 hover:bg-gray-800 cursor-pointer whitespace-nowrap transition-colors duration-150"
                                onClick={() => handleIconSizeChange('large')}
                            >
                                Grandes icônes
                            </div>
                        </div>
                    </div>

                    <div
                        className="px-4 py-2 hover:bg-gray-800 cursor-pointer transition-colors duration-200"
                        onClick={handleRefresh}
                    >
                        Actualiser
                    </div>

                    <div className="relative group">
                        <div className="px-4 py-2 hover:bg-gray-800 cursor-pointer flex justify-between items-center transition-colors duration-200">
                            Nouveau
                            <span className="ml-auto text-white text-xl">›</span>
                        </div>
                        <div className="absolute left-[105%] top-0 bg-black/20 backdrop-blur-xs rounded-lg shadow-xl py-1 border border-gray-700 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">
                            <div
                                className="px-4 py-2 hover:bg-gray-800 cursor-pointer whitespace-nowrap transition-colors duration-150"
                                onClick={createFile}
                            >
                                Fichier
                            </div>
                            <div
                                className="px-4 py-2 hover:bg-gray-800 cursor-pointer whitespace-nowrap transition-colors duration-150"
                                onClick={createFolder}
                            >
                                Dossier
                            </div>
                        </div>
                    </div>

                    <div
                        className="px-4 py-2 hover:bg-gray-800 cursor-pointer transition-colors duration-200"
                        onClick={() => { setPage('This PC'); setContextMenu(null) }}
                    >
                        Paramètres
                    </div>

                    <div
                        className="px-4 py-2 hover:bg-gray-800 cursor-pointer transition-colors duration-200"
                        onClick={() => { setPage('Terminal'); setContextMenu(null) }}
                    >
                        Ouvrir cmd ici
                    </div>
                </div>
            )}

            {itemContextMenu && (
                <div
                    className='absolute bg-black/20 backdrop-blur-xs rounded-lg shadow-xl py-1 border border-gray-700 text-white z-50'
                    style={{ left: `${itemContextMenu.x}px`, top: `${itemContextMenu.y}px` }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className='px-4 py-2 hover:bg-gray-700 cursor-pointer' onClick={() => handleItemClick(itemContextMenu.item)}>
                        Ouvrir
                    </div>
                    <div className='px-4 py-2 hover:bg-gray-700 cursor-pointer' onClick={() => handleItemRename(itemContextMenu.item)}>
                        Renommer
                    </div>
                    {(itemContextMenu.item.type === 'folder' || itemContextMenu.item.type === 'myfolder') && (
                        <div
                            className='px-4 py-2 hover:bg-gray-700 cursor-pointer'
                            onClick={() => {
                                downloadFolderAsZip(itemContextMenu.item);
                                setItemContextMenu(null);
                            }}
                        >
                            Télécharger
                        </div>
                    )}
                    <div
                        className='px-4 py-2 hover:bg-gray-700 cursor-pointer'
                        onClick={() => handleDelete(itemContextMenu.item)}
                    >
                        Supprimer
                    </div>
                </div>
            )}
            {safeMode &&
                <div className='fixed bottom-14 right-0 z-50 bg-gray-500 text-white font-semibold' onClick={() => router.push('____Shutdown')}>Safe Mode Actif</div>
            }
        </div>
    );
};

export default Desktop;
