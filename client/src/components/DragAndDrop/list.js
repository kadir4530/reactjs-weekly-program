import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


const finalSpaceCharacters = [
    {
        id: 'gary',
        name: 'Gary Goodspeed',
    },
    {
        id: 'cato',
        name: 'Little Cato',
    },
    {
        id: 'kvn',
        name: 'KVN',
    },
    {
        id: 'mooncake',
        name: 'Mooncake',
    },
    {
        id: 'quinn',
        name: 'Quinn Ergon',
    }
]

function ListView() {
    const [characters, updateCharacters] = useState(finalSpaceCharacters);

    function handleOnDragEnd(result) {
        if (!result.destination) return;

        const items = Array.from(characters);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        console.log(result)
        updateCharacters(items);
    }

    function handleDragUpdate(item) {
        console.log(item)
    }
    return (
        <div className="App">
            <header className="App-header">
                <h1>Final Space Characters</h1>
                <DragDropContext onDragEnd={handleOnDragEnd} onDragUpdate={handleDragUpdate}>
                    <Droppable droppableId="characters">
                        {(provided) => (
                            <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                                {characters.map(({ id, name }, index) => {
                                    return (
                                        <Draggable key={id} draggableId={id} index={index}>
                                            {(provided) => (
                                                <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                    <div className="characters-thumb">
                                                    </div>
                                                    <p>
                                                        {name}
                                                    </p>
                                                </li>
                                            )}
                                        </Draggable>
                                    );
                                })}
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>
                <DragDropContext onDragEnd={handleOnDragEnd} onDragUpdate={handleDragUpdate}>
                <Droppable droppableId="characters">
                        {(provided) => (
                            <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                                {characters.map(({ id, name }, index) => {
                                    return (
                                        <Draggable key={id} draggableId={id} index={index}>
                                            {(provided) => (
                                                <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                    <div className="characters-thumb">
                                                    </div>
                                                    <p>
                                                        {name}
                                                    </p>
                                                </li>
                                            )}
                                        </Draggable>
                                    );
                                })}
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>
            </header>
            <p>
                Images from <a href="https://final-space.fandom.com/wiki/Final_Space_Wiki">Final Space Wiki</a>
            </p>
        </div>
    );
}

export default ListView;