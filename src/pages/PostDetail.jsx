import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import youtubeIcon from '../assets/youtube.png'
import twitterIcon from '../assets/twitter.png'
import instagramIcon from '../assets/2227.jpg'
import './PostDetail.css'
import { supabase } from '../client'

const PostDetail = ({data}) => {

    const { id } = useParams()
    const [post, setPost] = useState(null) 

    useEffect(() => {
      const fetchPost = async () => {
        const { data, error } = await supabase
          .from('Posts')
          .select()
          .eq('id', id)
          .single() 
        if (error) console.error(error)
        else setPost(data)
      }
      fetchPost()
    }, [id])   
    
    
    if (!post) return <div>Post not found</div> 


    return (
      <div className="post-detail">
        <div className="post-image">
          <img src={post.imageLink} alt={post.name} />
        </div>
        
        <div className="post-text">
            <h2>{post.name}</h2>

            <p>{post.description}</p>
            <h3>Social Media Links</h3>
            {post.youtube && post.youtube !== 'NULL' && (
                <div className="social-media-link">
                    <img src={youtubeIcon} alt="YouTube icon" />
                    <span> @{post.youtube}</span>
                </div>
            )}
            {post.twitter && post.twitter !== 'NULL' && (
                <div className="social-media-link">
                    <img src={twitterIcon} alt="Twitter icon" />
                    <span> @{post.twitter}</span>
                </div>
            )}
            {post.instagram && post.instagram !== 'NULL' && (
                <div className="social-media-link">
                    <img src={instagramIcon} alt="Instagram icon" />
                    <span> @{post.instagram}</span>
                </div>
            )}
        </div>
      </div>
    )
}

export default PostDetail