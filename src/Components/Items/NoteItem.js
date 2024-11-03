// Importing useContext for using the Context API
import React, { useContext } from 'react'

// Using the Context API
import MyContext from '../../Context/MyContext';

// As we needed the data from the props
export default function NoteItem(props) {

    const contextData = useContext(MyContext);
    // console.log(contextData);
    // Destructuring Data
    // Here we only need a addNote function
    const { deleteNote } = contextData;

    // Applying Destructing from the props
    const noteItem = props.note;
    const updatenote = props.updatenote;

    return (
        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-3" >
            <div className="card noteCard text-black">

                <div className="card-body">
                    <h5 className="card-title mb-0">
                        <div className="d-flex align-items-center">
                            <div className="p-2 flex-grow-1 noteTitle"><strong>{noteItem.title}</strong></div>
                            <div className="p-2">
                                {/* // TODO Add a Model for Delete  */}
                                {/* Deleting note using the function deleteNote() from the Context API */}
                                <i className="icons fa-solid fa-trash" style={{ "color": "#1e1e1e" }} onClick={() => deleteNote(noteItem._id)}></i>
                            </div>
                            <div className="p-2">
                                <i className="icons fa-solid fa-marker" style={{ "color": "#1e1e1e" }} onClick={() => updatenote(noteItem)}></i>
                            </div>
                        </div>
                    </h5>

                    <div className="container d-grid-col px-2 justify-content-center">
                        {noteItem.tags.split(",").map((tag,index) => {
                            if (tag) {
                                return <span key={noteItem._id+tag+index} className="badge rounded-pill bg-success card-text px-2 tags" style={{ marginLeft: "0px", marginRight: "5px" }}><i className="fa-solid fa-tags" style={{ "color": "#ffffff", marginRight: "px" }}></i> {tag.toString()}</span>
                            }
                            return null;
                        })}
                    </div>

                    <p className="card-text p-2">{noteItem.description}</p>
                </div>
                <div className="card-footer text-body-secondary small">
                    {/* Getting the Date Formatted from the Context Function */}
                    <div className='px-2'>Created : {contextData.formattedDateTime(noteItem.date)}</div>

                    {/* TODO : Add Last Date Modified */}
                    {/* <div className='px-2'>Last Modified : </div> */}
                </div>
            </div>
        </div>
    );
}
