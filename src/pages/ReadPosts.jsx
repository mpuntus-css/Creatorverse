import { useState, useEffect } from 'react'
import Card from '../components/Card'
import { supabase } from '../client'
import { Link } from 'react-router-dom'


const ReadPosts = (props) => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            const {data} = await supabase
            .from('Posts')
            .select()
            .order('created_at', { ascending: true })

            setPosts(data)
        }
        fetchPosts()
    }, [props])
    
    return (
        <div className="ReadPosts">
            {
                posts && posts.length > 0 ?
                [...posts]
                .sort((a, b) => a.id - b.id)
                .map((post,index) => 
                    <Link to={`/post/${post.id}`} key={post.id}>
                        <Card 
                            id={post.id} 
                            name={post.name}
                            imageLink={post.imageLink}
                            description={post.description}
                            youtube={post.youtube}
                            twitter={post.twitter}
                            instagram={post.instagram}
                            betCount={post.betCount}
                        />
                    </Link>
                ) : <h2>{'No Creators Yet 😞'}</h2>
            }
        </div>  
    )
}

export default ReadPosts