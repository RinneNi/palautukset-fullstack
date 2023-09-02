const ToggleVisibility = (blogId, blogVisibility, setBlogVisibility) => {
  const updatedVisibility = { ...blogVisibility }

  updatedVisibility[blogId] = !updatedVisibility[blogId]

  setBlogVisibility(updatedVisibility)
}

export default ToggleVisibility