import React, {useContext} from 'react'
import noteContext from "../context/notes/noteContext"
import Noteitem from './Noteitem';

export default function Chat() {
  const context = useContext(noteContext);
  const { chats, setChats, username, setusername, chat, setchat, myusername, getChats, addChat, updateChat} = context;
  getChats();
    return (
      <div>
      {chats.map((chats)=>{
          return <Noteitem chats={chats} setusername={setusername}  setchat={setchat}/>  
      })}
      </div>

      //   <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white" style={{width: "99vw"}}>

      //   <div className="list-group list-group-flush border-bottom scrollarea">
    
      //     <Link to="/chatbox" className="list-group-item list-group-item-action py-3 lh-tight">
      //       <div className="d-flex w-100 align-items-center justify-content-between">
      //         <strong className="mb-1">Rohit</strong>
      //         <small className="text-muted">Wed</small>
      //       </div>
      //       <div className="col-10 mb-1 small">Hello!</div>
      //     </Link>
      //   </div>
      // </div>
    
    )
}
