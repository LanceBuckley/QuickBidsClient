import React, { useEffect, useState } from "react"
import { getFields } from "../../managers/fieldManager"

const NewJob = () => {
    const [job, update] = useState({
        name: "",
        address: "",
        blueprint: "",
        square_footage: 0
    })

    const [fields, setFields] = useState([])

    const [chosenFields, setChosenFields] = useState([])

    useEffect(() => {
        getFields()
            .then((fieldList) => setFields(fieldList))
    }, [])

    return (
        <form className="jobForm">
            <h2 className="jobFormHeader">New Job</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="jobHTML" className="jobName">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="The name of the company hiring you"
                        value={job.name}
                        onChange={(evt) => {
                            const copy = { ...job }
                            copy.name = evt.target.value
                            update(copy)
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="jobHTML" className="jobAddress">Address:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="The location of the job"
                        value={job.address}
                        onChange={(evt) => {
                            const copy = { ...job }
                            copy.address = evt.target.value
                            update(copy)
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="jobHTML" className="jobSquareFt">Square Footage:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="The size of the job area"
                        value={job.square_footage}
                        onChange={(evt) => {
                            const copy = { ...job }
                            copy.square_footage = evt.target.value
                            update(copy)
                        }}
                    />
                </div>
            </fieldset>
        </form>
    )
}


export default NewJob