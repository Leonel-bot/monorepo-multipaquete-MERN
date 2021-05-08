import React, { useEffect, useState } from 'react'
import './home.css'
import { createNote } from '../../services/create_note'
import { getAllNotes } from '../../services/get_all_notes'
import {deleteNote} from '../../services/delete_note'

export default function Form() {

    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState({
        title: '',
        description: '',
        important: false,
    })

    const change = (ev) => {
        let name = ev.target.name
        let value = ev.target.value
        setNewNote({ ...newNote, [name]: value })
    }

    const handleSubmit = (ev) => {
        ev.preventDefault()
        if (newNote.title) {
            createNote(newNote)
                .then(res => {
                    setNotes([...notes, res])
                })
        }
    }
    const handleClick = (ev) => {
        const {id} = ev.target
        deleteNote(id).then(() => {
            getAllNotes()
            .then(res => {
                setNotes(res)
            })
        })
    }

    useEffect(() => {
        getAllNotes()
        .then(res => {
            setNotes(res)
        })
    }, [setNotes])



    return (
        <div>
            <div className="formNote">
                <h3>Create note</h3>
                <form action="" onSubmit={handleSubmit} onChange={change}>
                    <input type="text" name="title" placeholder="Title" />
                    <input type="text" name="description" placeholder="Description" />
                    <div>
                        <p>Important?</p>
                        <label htmlFor="true">Si</label>
                        <input type="radio" name="important" id="true" value="true"/>
                        <label htmlFor="false">No</label>
                        <input type="radio" name="important" id="false" value="false"/>
                    </div>
                    <button>Cargar</button>
                </form>
            </div>

            <div className="list_note">
                <h4>List notes</h4>
                <div className="notes">
                    {notes
                        ? <div>{notes.map(note => (
                            <div className="note" key={note.id}>
                                <p>{note.title}</p><button id={note.id} onClick={handleClick}>Delete</button>
                            </div>
                        ))}</div>
                        : <div>Loading</div>
                    }
                </div>
            </div>

        </div>
    )
}
