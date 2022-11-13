import React from 'react'
import { CDBFooter, CDBFooterLink, CDBBox, CDBBtn, CDBIcon } from 'cdbreact';

function Footer() {
  return (
    <CDBFooter className="shadow footer mt-5 " >
      <CDBBox
        display="flex"
        justifyContent="between"
        alignItems="center"
        className="mx-auto py-4 flex-wrap"
        style={{ width: '80%' }}
      >
        <CDBBox display="flex" alignItems="center">
         
          <small className="ml-2">&copy; 2022 Colby Fayock</small>
        </CDBBox>
        <a>#50reactprojects</a>
        <p>63</p>
      </CDBBox>
      
      
    </CDBFooter>
  )
}

export default Footer