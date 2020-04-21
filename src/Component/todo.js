import React from 'react';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import {addTask,deleteTask,completeTask,editTask,changeTask} from '../Action/actions';

class Todo extends React.Component {

    addItem = (e) => {
        e.preventDefault();
        const newItem = {id:uuid(),content:this.newItem.value,status:false,editable:false};
        newItem.content !== '' && this.props.addTask(newItem);
        this.form.reset();
    }

    render () {
        const {items} = this.props;
        return (
        <div>
            <header>
                <h1>To-Do App !</h1>
                <h2>Add New To-Do</h2>
                <form ref={(input) => this.form =input} className="form" onSubmit={this.addItem}>
                    <input ref={(input) => this.newItem =input} type="text" id="input-content" className="input-content" placeholder="Enter new task"/>
                    <button type='submit' id="add-btn" className="add-btn">Add</button>
                </form>
            </header>
            <main id="main-container">
                <div className="title-bloc">
                    <h2 className="task-title">Let's get some work done!</h2>
                    <hr />
                </div>
                {items.map((item,i) => (
                    <div key={i} className="task-bloc">
                        <button className='valid-btn'  onClick={() => this.props.completeTask(item)}>{item.status ? " Undo " : " Complete "}</button>
                        
                        <div className = 'content-bloc'>
                            { item.editable ? (
                                <input className='text-content' value={item.content} onChange={(e)=>this.props.changeTask(e.target.value,item)} autoFocus/>
                                ) : (
                                <span className={item.status ? 'text-content active' : 'text-content'} >{item.content}</span>
                                ) 
                            }
                        </div>
                        <button className='edit-btn'onClick={() => this.props.editTask(item)}>{item.editable ? "Save" : "Edit"}</button>
                        <button className='del-btn' onClick={() => this.props.deleteTask(item)}>Delete</button>
                        <br className="breakline" />
                    </div>
                ))}
            </main>
        </div>
        )   
    }
}

const mapStateToProps = (state) => ({
    items : state.items
})

const mapDispatchToProps = (dispatch) => ({
        addTask : (payload) => dispatch(addTask(payload)),
        deleteTask : (payload) => dispatch(deleteTask(payload)),
        completeTask : (payload) => dispatch(completeTask(payload)),
        editTask : (payload) => dispatch(editTask(payload)),
        changeTask : (input,payload) => dispatch(changeTask(input,payload)),
})

export default connect(mapStateToProps, mapDispatchToProps) (Todo);