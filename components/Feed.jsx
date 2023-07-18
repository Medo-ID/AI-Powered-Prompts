"use client"

import {useState, useEffect} from 'react'

import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  
  const [posts, setPosts] = useState([])

  //search state
  const [searchText, setSearchText] = useState('')
  const [searchTimeout, setSearchTimeout] = useState(null)
  const [searchResults, setSearchResults] = useState([])

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, 'i')
    return posts.filter(
      (item) => 
      regex.test(item.creator.username) ||
      regex.test(item.tag) ||
      regex.test(item.prompt)
    )
  }
  
  const handleSearchChange = (event) => {
    clearTimeout(searchTimeout)
    setSearchText(event.target.value)

    setSearchTimeout(
      setTimeout(() => {
        const searchResult =filterPrompts(event.target.value)
        setSearchResults(searchResult)
      }, 500)
    )
  }

  const handleTagClick = (tagName) => {
    setSearchText(tagName)

    const searchResult = filterPrompts(tagName)
    setSearchResults(searchResult)
  }

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className='feed'>
      
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          className='search_input peer'
        />
      </form>

      <PromptCardList 
        data={searchText.length > 0 ? searchResults :  posts}
        handleTagClick={handleTagClick}
      />

    </section>
  )
}

export default Feed