import { useContext, useState } from 'react'
import context from '../context/notes/noteContext'


const AddNote = (props) => {
    const noteContext = useContext(context)
    const { addNote } = noteContext

    const [note, setnote] = useState({ title: "", description: "", tag: "" })

    const handleClick = (e) => {

        addNote(note.title, note.description, note.tag)
        setnote({ title: "", description: "", tag: "" })
        props.showAlert("Note Added Successfully!!", "success")
        e.preventDefault();
    }

    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <div className="container">
                <h2>Add a Note</h2>

                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" value={note.title} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} />
                    </div>
                    <button type="submit" disabled={(note.title.length < 5 || note.description.length < 5) ? true : false} className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote