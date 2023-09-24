
export function onDelete(blog) {
    fetch(`/api/blogs/${blog._id}`,{
      method: "DELETE"
    })
    .then(r => r.json())
    .then(data => console.log(data))
  }