import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import "./todo.css"
import { addTodo, deleteTodo, editTodo } from '../actions/index';

export default function Todo() {
    const dispatch = useDispatch();
    const list = useSelector((state) => state.TodoReducer.list)
    
    const [inputData, setInputData] = useState('');
    const [editId, setEditId] = useState();
    const [isEdit, setIsEdit] = useState(false);
    

    const handleEdit = (id, data) => {
        setInputData(data);
        setIsEdit(true)
        setEditId(id);
    }

    return (
        <>
            <div className="main-div">
                <div className='child-div'>
                    <figure>
                        <figcaption><h3>Add Your List Here</h3></figcaption>
                    </figure>

                    <div className='addItems'>
                        <input className='Input' type="text" required placeholder=" Add Items.. " value={inputData} onChange={(e) => setInputData(e.target.value)} />
                        {!isEdit ?
                            <i className='fa fa-plus add-btn' onClick={() => { if (inputData !== '') dispatch(addTodo(inputData), setInputData('')) }} />
                            :
                            <i className='fas fa-save' onClick={() => { if (inputData !== '') dispatch(editTodo(editId, inputData), setInputData(''), setIsEdit(false)) }} />
                        }
                    </div>
                    {list?.length && <>
                        {list.map((ele) => {
                            return (
                                <div className='showItems' key={ele.id}>
                                    <div className='eachItems'>
                                        {ele?.data}
                                        <div>
                                            <i style={{ marginRight: '5px' }} className='far fa-trash-alt' title='Delete Items' onClick={() => dispatch(deleteTodo(ele?.id))} />
                                            <i className='fas fa-edit' title='edit Items' onClick={() => handleEdit(ele?.id, ele?.data)} />
                                        </div>

                                    </div>
                                </div>
                            )
                        })}
                    </>}
                </div>
            </div>
        </>
    )
}
