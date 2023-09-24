
export function onDelete(blog, serverBlogs, setServerBlogs) {
    fetch(`/api/blogs/${blog._id}`,{
      method: "DELETE"
    })
    .then(r =>{ if (r.ok) { r.json().then(data => {
        console.log(data)
        setServerBlogs(serverBlogs.filter((blog) => blog._id !== data._id))
    })}
})
  }