import { useState } from "react";


export function Rate() {
  const [editable, setEditable] = useState(false);
  
  return (
    <div className="container my-3">
      <h2>Exchange rate</h2>

      <form className="my-2 row g-3" onSubmit={() => {/**/}}>
        <div className="col-auto">
          <select className="form-select" style={{width: '112px'}}>
            <option value="1" selected>USD</option>
            <option value="2">EUR</option>
            <option value="3">Custom</option>
          </select>
        </div>
        <div className="col-auto d-flex gap-3 col-8 align-items-center">
            {!editable ? (
              <>
                <div className="col-auto">1.32</div>
                <div className="col-auto">
                  <i role="button" className="bi bi-pencil-square" onClick={() => setEditable(true)}></i>
                </div>
              </>
            ) : (
              <>
                <div className="col-auto col-8 d-flex gap-2 align-items-center">
                  <input 
                    type="text"
                    value="1.32"
                    className="form-control"
                    style={{width: '112px'}}
                    placeholder="Type rate..."/>

                  <div className="col-auto">
                    <i role="button" className="bi bi-check-lg" onClick={() => setEditable(false)}></i>
                  </div>
                  <div className="col-auto">
                    <i role="button" className="bi bi-x-lg" onClick={() => setEditable(false)}></i>
                  </div>
                </div>
              </>
            )}
        </div>
      </form>
    </div>
  )
}