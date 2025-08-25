import { useState } from 'react'
import './CreatePost.css'
import { supabase } from '../client'
import youtubeIcon from '../assets/youtube.png'
import twitterIcon from '../assets/twitter.png'
import instagramIcon from '../assets/2227.jpg'

const CreatePost = () => {

    const [post, setPost] = useState({name: "", imageLink: "", description: "", youtube: "", twitter: "", instagram: ""})

    const handleChange = (event) => {
        const {name, value} = event.target
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const createPost = async (event) => {
        event.preventDefault();

        await supabase
         .from('Posts')
         .insert({name: post.name, imageLink: post.imageLink, description: post.description, youtube: post.youtube, twitter: post.twitter, instagram: post.instagram})
         .select();

        window.location = "/";
    }

    return (
        <div>
            <form>
                <label htmlFor="name">Name</label> <br />
                <input type="text" id="name" name="name" onChange={handleChange} /><br />
                <br/>

                <label htmlFor="imageLink">Image</label><br />  
                <small> Provide a link to an image of your creator. Be sure to include the http:// </small><br />
                <input type="text" id="imageLink" name="imageLink" onChange={handleChange} /><br />
                <br/>

                <label htmlFor="description">Description</label><br />
                <small>Provide a description of the creator. Who are they? What makes them interesting?</small><br />
                <textarea rows="5" cols="50" id="description" name="description" onChange={handleChange}>
                </textarea>
                <br/>

                <h3>Social Media Links</h3>
                <p>Provide at least one of the creator's social media links.</p>

                <label htmlFor="youtube"><img src={youtubeIcon} alt="YouTube icon" />YouTube</label> <br />
                <small>The creator's YouTube handle (without the @)</small>
                <input type="text" id="youtube" name="youtube" onChange={handleChange} /><br />
                <br/>

                <label htmlFor="twitter"><img src={twitterIcon} alt="Twitter icon" />Twitter</label> <br />
                <small>The creator's Twitter handle (without the @)</small>
                <input type="text" id="twitter" name="twitter" onChange={handleChange} /><br />
                <br/>

                <label htmlFor="instagram"><img src={instagramIcon} alt="Instagram icon" />Instagram</label> <br />
                <small>The creator's Instagram handle (without the @)</small>
                <input type="text" id="instagram" name="instagram" onChange={handleChange} /><br />
                <br/>

                <input type="submit" value="Submit" onClick={createPost} />
            </form>
        </div>
    )
}

export default CreatePost