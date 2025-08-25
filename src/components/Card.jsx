import { useState } from 'react'
import './Card.css'
import more from './more.png'
import { Link } from 'react-router-dom'
import { supabase } from '../client'


const Card = (props) =>  {

  const [count, setCount] = useState(props.betCount)
  const updateCount = async (event) => {
    event.preventDefault()

    await supabase
      .from('Posts')
      .update({ betCount: count + 1 })
      .eq('id', props.id)

    setCount((count) => count + 1)
  }

  return (
      <div 
        className="Card" 
        style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${props.imageLink})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
          }}
      >
          <Link to={'edit/'+ props.id}><img className="moreButton" alt="edit button" src={more} /></Link>
          <h2 className="name">{props.name}</h2>
          {/* <img src={props.imageLink} alt={props.name} className="postImage" style={{ maxWidth: "250px", borderRadius: "8px" }} /> */}
          <p className="description">{props.description}</p>
      </div>
  );
};

export default Card