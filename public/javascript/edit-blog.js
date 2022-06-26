const editBlogContainer = document.querySelector("#edit-blog")
const editBlogForm = document.querySelector(".edit-blog-form")
const editBlogBtn = document.querySelector(".edit-blog-btn")

async function editFormHandler(event) {
  event.preventDefault()

  const title = document.querySelector('input[name="blog-title"]').value
  const content = document.querySelector('input[name="content"]').value

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ]

  const response = await fetch(`/api/blogs/${id}`, {
    method: "PUT",
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

editBlogBtn.addEventListener("click", function () {
  editBlogBtn.classList.add("hide")
  editBlogContainer.classList.remove("hide")
})

editBlogForm.addEventListener("submit", editFormHandler)
