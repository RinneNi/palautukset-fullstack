describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Tester',
      username: 'asd',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')

    cy.login({ username: 'asd', password: 'salasana' })
  })


  it('Login form is shown', function() {
    cy.contains('log in')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('asd')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()
      cy.contains('Tester logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('asd')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error').contains('wrong credentials')

      cy.get('html').should('not.contain', 'Tester logged in')
    })

    describe('When logged in', function() {
      beforeEach(function() {
        cy.request('POST', 'http://localhost:3000/api/login', {
          username: 'asd', password: 'salasana'
        }).then(response => {
          localStorage.setItem('loggedUser', JSON.stringify(response.body))
          cy.visit('http://localhost:3000')
        })
      })

      it('A blog can be created', function() {
        cy.contains('Lisää Blogi').click()
        cy.get('#title').type('Hieno blog')
        cy.get('#author').type('Niilo')
        cy.get('#url').type('www.hienoblogi.fi')
        cy.get('#lisääNappi').click()

        cy.get('.success').contains('Blogi <Hieno blog> Kirjoittaja <Niilo> lisätty!')
        cy.contains('view')
      })

      describe('When blog created', function() {
        beforeEach(function() {
          cy.request('POST', 'http://localhost:3000/api/login', {
            username: 'asd', password: 'salasana'
          }).then(response => {
            localStorage.setItem('loggedUser', JSON.stringify(response.body))
            cy.visit('http://localhost:3000')

            cy.contains('Lisää Blogi').click()
            cy.get('#title').type('Hieno blog')
            cy.get('#author').type('Niilo')
            cy.get('#url').type('www.hienoblogi.fi')
            cy.get('#lisääNappi').click()
          })
        })

        it('A blog can be liked', function() {
          cy.contains('view').click()
          cy.contains('Likes: 0')
          cy.contains('Like').click()
          cy.contains('Likes: 1')
        })

        it('A blog can be deleted by creator', function() {
          cy.contains('view').click()
          cy.contains('Poista').click()
          cy.get('html').should('not.contain', 'view')
          cy.get('html').should('not.contain', 'hide')
        })

        it('Delete function is only awailable for creator', function() {
          const user = {
            name: 'Tom',
            username: 'tom12',
            password: 'salasana'
          }
          cy.request('POST', 'http://localhost:3003/api/users', user)

          cy.get('#kirjauduUlos').click()
          cy.contains('log in').click()
          cy.get('#username').type('tom12')
          cy.get('#password').type('salasana')
          cy.get('#login-button').click()

          cy.contains('view').click()
          cy.get('html').should('not.contain', 'Poista')
        })

        it('Blogs are sorted by likes', function() {
          cy.contains('Lisää Blogi').click()
          cy.get('#title').type('Minä olen tykätyin blogi')
          cy.get('#author').type('Niilo')
          cy.get('#url').type('www.paljontykkäyksiä.fi')
          cy.get('#lisääNappi').click()

          cy.get('.blog').eq(0).should('contain', 'Hieno blog')

          cy.contains('view').click()
          cy.contains('view').click()
          cy.contains('hide').click()
          cy.contains('Like').click()
          cy.contains('hide').click()

          cy.get('.blog').eq(0).should('contain', 'Minä olen tykätyin blogi')
        })
      })
    })
  })
})
