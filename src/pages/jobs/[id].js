import React, { useEffect, useState } from "react"
import { getFields } from "../../managers/fieldManager"
import { getJob, updateJob } from "../../managers/jobManager"
import { Link } from "gatsby"
import { Navbar } from "../../components/nav/NavBar"
import { QuickBidsProvider } from "../../context/QuickBidsContext"
import "./NewJob.css"

const EditJob = (request, response) => {
    const id = parseInt(request.params.id)
    const [job, update] = useState({
        name: "",
        address: "",
        blueprint: "",
        square_footage: 0,
        contractor: {},
        fields: []
    })

    const [fields, setFields] = useState([])

    const [chosenFields, updateChosenFields] = useState([])

    const [formError, setFormError] = useState(false)

    const [initial, setInitial] = useState(true)


    useEffect(() => {
        getFields()
            .then((fieldList) => setFields(fieldList))
    }, [])

    useEffect(() => {
        getJob(id)
            .then((job) => update(job))
    }, [])

    useEffect(() => {
        if (job.fields.length !== 0 && initial === true) {
            const copy = [...chosenFields]
            job.fields.map((field) => copy.push(field.id))
            updateChosenFields(copy)
            setInitial(false)
        }
    }, [job])

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
            id: id,
            address: job.address,
            name: job.name,
            blueprint: job.blueprint,
            square_footage: job.square_footage,
            fields: chosenFields,
            contractor: job.contractor.id,
            open: job.open,
            complete: job.complete
        }
        updateJob(jobBody)
    }

    return (
        <>
            <QuickBidsProvider>
                <Navbar />
            </QuickBidsProvider>
            <main className="jobForm">
                <form className="box">
                    <h2 className="jobFormHeader">Edit Job</h2>
                    <fieldset>
                        <div className="form-group">
                            <label className="label">
                                Name
                                <div className="control">
                                    <input
                                        required
                                        name="jobName"
                                        type="text"
                                        className="input"
                                        placeholder="The name of the company hiring you"
                                        value={job.name}
                                        onChange={(evt) => {
                                            const copy = { ...job }
                                            copy.name = evt.target.value
                                            update(copy)
                                        }}
                                    />
                                </div>
                            </label>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <label className="label">
                                Address
                                <div className="control">
                                    <input
                                        required
                                        type="text"
                                        name="jobAddress"
                                        className="input"
                                        placeholder="The location of the job"
                                        value={job.address}
                                        onChange={(evt) => {
                                            const copy = { ...job }
                                            copy.address = evt.target.value
                                            update(copy)
                                        }}
                                    />
                                </div>
                            </label>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <label className="label">
                                Square Footage
                                <div className="control">
                                    <input
                                        required
                                        name="jobSquareFt"
                                        type="text"
                                        className="input"
                                        placeholder="The size of the job area"
                                        value={job.square_footage}
                                        onChange={(evt) => {
                                            const copy = { ...job }
                                            copy.square_footage = evt.target.value
                                            update(copy)
                                        }}
                                    />
                                </div>
                            </label>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <label className="label">
                                Fields:
                                {
                                    fields.length > 0 &&
                                    fields.map((field) => {
                                        return <div key={`fieldCheck--${field.id}`}>
                                            <input
                                                className="checkbox"
                                                name="jobFields"
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
                    <fieldset>
                        <div className="form-group">
                            <label className="label">
                                Open
                                {
                                    <div key={`open`}>
                                        <input
                                            className="checkbox"
                                            name="jobOpenStatus"
                                            type="checkbox"
                                            value={job.open}
                                            checked={job.open === true}
                                            onChange={(evt) => {
                                                const copy = { ...job }
                                                copy.open = evt.target.checked
                                                update(copy)
                                            }}
                                        />
                                    </div>
                                }
                            </label>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <label className="label">
                                Complete
                                {
                                    <div key={`open`}>
                                        <input
                                            className="checkbox"
                                            name="jobCompleteStatus"
                                            type="checkbox"
                                            value={job.complete}
                                            checked={job.complete === true}
                                            onChange={(evt) => {
                                                const copy = { ...job }
                                                copy.complete = evt.target.checked
                                                update(copy)
                                            }}
                                        />
                                    </div>
                                }
                            </label>
                        </div>
                    </fieldset>


                    <Link to="/"><button
                        onClick={(clickEvent) => { handleSaveButtonClick(clickEvent) }}
                        className="button is-primary"
                    >Submit
                    </button></Link>

                    <Link to="/"><button
                        className="button is-link"
                    >
                        Cancel
                    </button></Link>

                    {formError && <div className="alert alert-danger">Please fill in all of the required fields.</div>}
                </form>
            </main>
        </>
    )
}


export default EditJob