import React from 'react'
import { Link } from "react-router-dom";

const Noteitem = (props) => {
    const { chats ,setusername, setchat, myusername} = props;
    return (
        // <div className="col-md-3"> 
        //     <div className="card my-3"> 
        //         <div class ="card-body">
        //         <h5 class ="card-title">{note.title}</h5>
        //         <p class ="card-text">{note.description}</p> 
        //         </div>
        //     </div>
        // </div>

        <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white" style={{width: "100vw"}}>

        <div className="list-group list-group-flush border-bottom scrollarea">
    
          <Link to="/chatbox" className="list-group-item list-group-item-action py-3 lh-tight" onClick={()=>{
            setusername(chats.username[chats.username[0] === myusername ? 1 : 0]);
            setchat(chats);
          }}>
            <div className="d-flex w-100 align-items-center justify-content-between">
              <strong className="mb-1">{chats.username[chats.username[0] === myusername ? 1 : 0]}</strong>
              <small className="text-muted">{chats.chats.date[chats.chats.date.length - 1]}</small>
            </div>
            <div className="col-10 mb-1 small">{chats.chats.msg[chats.chats.msg.length - 1]}</div>
          </Link>
        </div>
      </div>
    )
}

export default Noteitem
