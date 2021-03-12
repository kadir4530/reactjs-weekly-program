import React, { useState } from 'react'
import List from './list'
import Table from './table'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ConfirmationDialog from './ConfirmationDialog'
const index = () => {
    return (
        <div>
            {/* <List />
            <Table /> */}
            <ConfirmationDialog />

        </div>
    )
}

export default index

