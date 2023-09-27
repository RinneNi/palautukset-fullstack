const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  yhte = blogs.reduce((s, o) => {
    return s + o.likes
  }, 0)

  return yhte
}

const favoriteBlog = (blogs) => {
  const eniten = blogs.reduce((maxB, curB) => {
    if (curB.likes > maxB.likes) {
      return curB
    } else {
      return maxB
    }
  }, blogs[0])
  return eniten
}

const mostBlogs = (blogs) => {
  const kirjoittaja = {}
  blogs.map((blog) => {
    if (blog.author in kirjoittaja) {
      kirjoittaja[blog.author] += 1
    } else {
      kirjoittaja[blog.author] = 1
    }
  })

  return Object.entries(kirjoittaja).reduce(
    (max, [author, blogs]) => {
      if (blogs > max.blogs) {
        return { author, blogs }
      }
      return max
    },
    { author: null, blogs: 0 },
  )
}

const mostLikes = (blogs) => {
  const kirjoittaja = {}
  blogs.map((blog) => {
    if (blog.author in kirjoittaja) {
      kirjoittaja[blog.author] += blog.likes
    } else {
      kirjoittaja[blog.author] = blog.likes
    }
  })

  return Object.entries(kirjoittaja).reduce(
    (max, [author, likes]) => {
      if (likes > max.likes) {
        return { author, likes }
      }
      return max
    },
    { author: null, likes: 0 },
  )
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
