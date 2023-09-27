import React, { useEffect } from 'react';

function Ilmoitus({ ilmoitus, ilmoitusTeksti, setIlmoitus }) {
  useEffect(() => {
    if (ilmoitus) {
      const timeout = setTimeout(() => {
        setIlmoitus(false);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [ilmoitus]);

  return (
    <div>
      {ilmoitus && <p>{ilmoitusTeksti}</p>}
    </div>
  );
}

export default Ilmoitus;
