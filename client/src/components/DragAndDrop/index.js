import React, { useState } from 'react'
import List from './list'
import Table from './table'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ConfirmationDialog from './ConfirmationDialog' 

export default function Index() {

 
    return (
        <div>
            {/* <List />
            <Table /> */}
            <ConfirmationDialog />

        </div>
    )
}



