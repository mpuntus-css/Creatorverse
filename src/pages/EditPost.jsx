import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import './EditPost.css'
import { supabase } from '../client'
import youtubeIcon from '../assets/youtube.png'
import twitterIcon from '../assets/twitter.png'
import instagramIcon from '../assets/2227.jpg'

const EditPost = ({data}) => {

    const {id} = useParams()
    const [post, setPost] = useState({id: null, name: "", imageLink: "", description: "", youtube: "", twitter: "", instagram: ""})


    useEffect(() => {
        const fetchPost = async () => {
            const { data } = await supabase
                .from('Posts')
                .select()
                .eq('id', id)
                .single()
            if (data) setPost(data)
        }
        fetchPost()
    }, [id])


    const handleChange = (event) => {
        const {name, value} = event.target
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const updatePost = async (event) => {
        event.preventDefault()
        await supabase
            .from('Posts')
            .update({ name: post.name, imageLink: post.imageLink,  description: post.description, youtube: post.youtube, twitter: post.twitter, instagram: post.instagram })
            .eq('id', id)

         window.location = "/";
    }

    const deletePost = async (event) => {
        event.preventDefault()

        await supabase
            .from('Posts')
            .delete()
            .eq('id', id)

        window.location = "/";
    }
    return (
        <div>
            <form>
                <label htmlFor="name">Name</label> <br />
                <input type="text" id="name" name="name" value={post.name} onChange={handleChange} /><br />
                <br/>

                <label htmlFor="imageLink">Image</label><br />  
                <small> Provide a link to an image of your creator. Be sure to include the http:// </small><br />
                <input type="text" id="imageLink" name="imageLink" value={post.imageLink} onChange={handleChange} /><br />
                <br/>

                <label htmlFor="description">Description</label><br />
                <small>Provide a description of the creator. Who are they? What makes them interesting?</small><br />
                <textarea rows="5" cols="50" id="description" name="description" value={post.description} onChange={handleChange}>
                </textarea>
                <br/>

                <h3>Social Media Links</h3>
                <p>Provide at least one of the creator's social media links.</p>

                <label htmlFor="youtube"><img src={youtubeIcon} alt="YouTube icon" />YouTube</label> <br />
                <small>The creator's YouTube handle (without the @)</small>
                <input type="text" id="youtube" name="youtube" value={post.youtube} onChange={handleChange} /><br />
                <br/>

                <label htmlFor="twitter"><img src={twitterIcon} alt="Twitter icon" />Twitter</label> <br />
                <small>The creator's Twitter handle (without the @)</small>
                <input type="text" id="twitter" name="twitter" value={post.twitter} onChange={handleChange} /><br />
                <br/>

                <label htmlFor="instagram"><img src={instagramIcon} alt="Instagram icon" />Instagram</label> <br />
                <small>The creator's Instagram handle (without the @)</small>
                <input type="text" id="instagram" name="instagram" value={post.instagram} onChange={handleChange} /><br />
                <br/>
                <input type="submit" value="Submit" onClick={updatePost} />
                <button className="deleteButton" onClick={deletePost}>Delete</button>
            </form>
        </div>
    )
}

export default EditPost