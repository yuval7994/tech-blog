const blogForm = document.querySelector(".new-blog-form")
const addBlogBtn = document.querySelector("#add-blog")

async function newFormHandler(event) {
  event.preventDefault()

  const title = document.querySelector('input[name="blog-title"]').value
  const content = document.querySelector('input[name="content"]').value

  const response = await fetch(`/api/blogs`, {
    method: "POST",
    body: JSON.stringify({
      title,
      content,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (response.ok) {
    document.location.replace("/dashboard")
  } else {
    alert(response.statusText)
  }
}

addBlogBtn.addEventListener("click", function () {
  blogForm.classList.remove("hide")
  addBlogBtn.classList.add("hide")
})

blogForm.addEventListener("submit", newFormHandler)
