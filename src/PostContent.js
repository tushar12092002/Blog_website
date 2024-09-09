import { createContext, useContext } from "react";
import { useState } from "react";
import { faker } from "@faker-js/faker";



function createRandomPost() {
    return {
      title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
      body: faker.hacker.phrase(),
    };
  }


const PostContent = createContext();


function PostProvider({children}) {
    const [posts, setPosts] = useState(() =>
        Array.from({ length: 30 }, () => createRandomPost())
      );
      const [searchQuery, setSearchQuery] = useState("");
    
    
      // Derived state. These are the posts that will actually be displayed
      const searchedPosts =
        searchQuery.length > 0
          ? posts.filter((post) =>
              `${post.title} ${post.body}`
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
            )
          : posts;
    
      function handleAddPost(post) {
        setPosts((posts) => [post, ...posts]);
      }
    
      function handleClearPosts() {
        setPosts([]);
      }


      return <PostContent.Provider value={{
        posts :searchedPosts,
        onClearPosts :handleClearPosts,
        searchQuery,
        setSearchQuery,
        onAddPost :handleAddPost,
      }}>

    {children}
</PostContent.Provider>

}



// custom Hook
function usePosts(){
    const context = useContext(PostContent);
    if(context === undefined){
      throw new Error("Postcontent was outside of PostProvider")
    }
    return context;
}

export { usePosts  , PostProvider}
