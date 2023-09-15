import React, { useEffect, useState } from "react"
import { getFields } from "../../managers/fieldManager"
import { createJob } from "../../managers/jobManager"
import { Link } from "gatsby"
import { Navbar } from "../../components/nav/NavBar"
import { QuickBidsProvider } from "../../context/QuickBidsContext"

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
        if (!job.name || !job.address || !job.blueprint || job.square_footage === 0) {
            event.preventDefault()
            setFormError(true)
            return
        }

        const jobBody = {
            address: job.address,
            name: job.name,
            blueprint: job.blueprint,
            square_footage: job.square_footage,
            fields: chosenFields
        }
        createJob(jobBody)
    }

    return (
        <>
            <QuickBidsProvider>
                <Navbar />
            </QuickBidsProvider>
            <form className="jobForm">
                <h2 className="jobFormHeader">New Job</h2>

                <fieldset>
                    <div className="form-group">
                        <label className="jobName">
                            Name:
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
                        </label>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label className="jobAddress">
                            Address:
                            <input
                                required
                                type="text"
                                name="jobAddress"
                                className="form-control"
                                placeholder="The location of the job"
                                value={job.address}
                                onChange={(evt) => {
                                    const copy = { ...job }
                                    copy.address = evt.target.value
                                    update(copy)
                                }}
                            />
                        </label>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label className="jobSquareFt">
                            Square Footage:
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
                        </label>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label className="jobBlueprint">
                            Blueprint:
                            <input
                                required
                                type="file"
                                className="form-control"
                                accept="image/*"
                                onChange={(evt) => {
                                    const selectedFile = evt.target.files[0]
                                    if (selectedFile) {
                                        const reader = new FileReader()
                                        reader.onload = function (e) {
                                            const imageDataUrl = e.target.result
                                            const copy = { ...job }
                                            copy.blueprint = imageDataUrl
                                            update(copy)
                                        }
                                        reader.readAsDataURL(selectedFile)
                                    }
                                }}
                            />
                        </label>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label className="jobFields">
                            Fields:
                            {
                                fields.length > 0 &&
                                fields.map((field) => {
                                    return <div key={`fieldCheck--${field.id}`}>
                                        <input
                                            id={`${field.id}`}
                                            type="checkbox"
                                            value={field.id}
                                            checked={chosenFields.includes(field.id)}
                                            onChange={(e) => addOrRemoveField(e)}
                                        />
                                        {field.job_title}
                                    </div>
                                })
                            }
                        </label>
                    </div>
                </fieldset>

                <Link to="/"><button
                    onClick={(clickEvent) => { handleSaveButtonClick(clickEvent) }}
                    className="btn btn-primary"
                >Submit
                </button></Link>

                <Link to="/"><button
                    className="btn btn-primary"
                >
                    Cancel
                </button></Link>

                {formError && <div className="alert alert-danger">Please fill in all of the required fields.</div>}
            </form>
        </>
    )
}


export default NewJob