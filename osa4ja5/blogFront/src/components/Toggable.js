import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'

// Togglable-komponentti, joka piilottaa ja näyttää sisältöä klikattaessa
const Togglable = forwardRef((props, ref) => {
  // Tila, joka pitää kirjaa onko visible true/false
  const [visible, setVisible] = useState(false)

  // Tyylit, joilla määritetään sisällön piilottaminen/näyttäminen.
  const hideWhenVisible = { display: visible ? 'none' : '' }// Jos visible = true > display = none
  const showWhenVisible = { display: visible ? '' : 'none' }// Jos visible = false > display = true

  // Tapahtumankäsittelijä, joka kääntää bitin
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }

  return (
    <div>
      <div style={hideWhenVisible}>{/* Napilla käännetään bitti visible | Jos bit = true nappi ei näy */}
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}{/* Näytetään props.lapset, eli sisältö, jos bit = true*/}
        {/* props.childer on KAIKKI mitä asetetaan Toggable sisään
        <Togglable buttonLabel="new blog">
          <iput></iput> tai vaikka button tai tekstiä
        </Togglable>
        */}
        <button onClick={toggleVisibility}>cancel</button>{/* Napin käännetään bit */}
      </div>
    </div>
  )
})

Togglable.displayName = 'Toggable'

export default Togglable