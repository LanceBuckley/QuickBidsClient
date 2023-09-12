import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getFields } from "../../managers/fieldManager"
import { useQuickBids } from "../../context/QuickBidsContext"
import { createJob } from "../../managers/jobManager"

const NewJob = () => {
    const [job, update] = useState({
        name: "",
        address: "",
        blueprint: "",
        square_footage: 0
    })

    const [fields, setFields] = useState([])

    const [chosenFields, updateChosenFields] = useState([])

    const [formError, setFormError] = useState(false)

    const navigate = useNavigate()

    const { token } = useQuickBids()

    useEffect(() => {
        getFields()
            .then((fieldList) => setFields(fieldList))
    }, [])

    const addOrRemoveField = (e) => {
        const checkedFieldId = parseInt(e.target.value)
        if (chosenFields.includes(checkedFieldId)) {
            const updatedFields = chosenFields.filter(field => field !== checkedFieldId)
            updateChosenFields(updatedFields)
        } else {
            const copy = [...chosenFields]
            copy.push(checkedFieldId)
            updateChosenFields(copy)
        }
    }

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        if (!job.name || !job.address || !job.blueprint || job.square_footage === 0) {
            setFormError(true);
            return;
        }
        const jobBody = {
            address: job.address,
            name: job.name,
            blueprint: job.blueprint,
            square_footage: job.square_footage,
            fields: chosenFields
        }
        createJob(jobBody)
            .then(navigate(`/`))
    }

    return (
        <form className="jobForm">
            <h2 className="jobFormHeader">New Job</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="jobHTML" className="jobName">Name:</label>
                    <input
                        required
                        id="jobName"
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
                        required
                        id="jobAddress"
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
                        required
                        id="jobSquareFt"
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
            <fieldset>
                <div className="form-group">
                    <label htmlFor="jobHTML" className="jobBlueprint">Blueprint:</label>
                    <input
                        required
                        type="file"  // Use type="file" for image uploads
                        className="form-control"
                        accept="image/*"  // Specify accepted file types (e.g., images)
                        onChange={(evt) => {
                            const selectedFile = evt.target.files[0];
                            if (selectedFile) {
                                const copy = { ...job };
                                copy.blueprint = selectedFile;
                                update(copy);
                            }
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="jobHTML" className="jobFields">Fields:</label>
                    {
                        fields.length > 0 &&
                        fields.map((field) => {
                            return <div key={`fieldCheck--${field.id}`}>
                                <label>
                                    <input
                                        id="jobFields"
                                        type="checkbox"
                                        value={field.id}
                                        checked={chosenFields.includes(field.id)}
                                        onChange={(e) => addOrRemoveField(e)}
                                    />
                                    {field.job_title}
                                </label>
                            </div>
                        })
                    }
                </div>
            </fieldset>

            <button
                onClick={(clickEvent) => { handleSaveButtonClick(clickEvent) }}
                className="btn btn-primary"
            >
                Submit
            </button>
            <button
                onClick={(e) => navigate("/")}
                className="btn btn-primary"
            >
                Cancel
            </button>

            {formError && <div className="alert alert-danger">Please fill in all of the required fields.</div>}
        </form>
    )
}


export default NewJob