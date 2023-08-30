"use client"
import { postPurchaseOrder } from "@/api/postPurchaseOrder"
import { useState } from "react"

export default function PurchaseOrderForm() {

    const [vendorName, setVendorName] = useState('')
    const [date, setDate] = useState('')
    const [file, setFile] = useState()

    const [validationError, setValidationError] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const handlePostForm = () => {
        postPurchaseOrder(vendorName, date, file)
        .then((response) => {
            if(response?.data.body.status === 'success') {
                setValidationError('')
                setSuccessMessage('Purchase order uploaded successfully')
            } else if(response?.data.body.status === 'failed_validation') {
                setValidationError(response?.data.body.data)
                setSuccessMessage('')
            } else if(response?.data.body.status === 'error') {
              setValidationError(response?.data.body.data)
              setSuccessMessage('')
          }
        }
        )
    }

    const handleSetFile = (event: any) => {
      const file = event.target.files[0];
      setFile(file)
    }

    return (
      <main className="flex min-h-screen flex-col items-center p-24">
        <h1 className="text-lg mb-4"> Upload Purchase Orders</h1>
        <div className="flex flex-col items-center justify-center">
          <div className='flex flex-col space-y-2'>
            <div>
            <input name='vendor_name' type='text' placeholder='Vendor' className="text-black"  value={vendorName} onChange={(event) => {
                setVendorName(event.target.value)
            }}/>
            </div>
            <div>
            <input name='date' type='text' placeholder='date' value={date} className="text-black" onChange={(event) => {setDate(event.target.value)}} />
            </div>
            <div>
            <input name='file' type='file' placeholder='file' className="text-black" onChange={handleSetFile} />
            {file &&
            <label>{file.name}</label>
              }
            </div>
            <div>
              <button onClick={handlePostForm}>Upload</button>
            </div>
            {validationError &&
              <p className="text-red-500">{validationError}</p>
            }
            { successMessage &&
              <p className="text-green-500">{successMessage}</p>
            }
          </div>
        </div>
      </main>
    )
  }
  