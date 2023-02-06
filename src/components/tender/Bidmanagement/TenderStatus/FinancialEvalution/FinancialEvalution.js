import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Select from "react-select";
import { useBaseUrl } from "../../../../hooks/useBaseUrl";
import LockCard from "../../../../UI/LockCard"
import PreLoader from "../../../../UI/PreLoader";




const FinancialEvalution = () => {

    const { id } = useParams();
    const [FetchLoading, setFetchLoading] = useState(false);
    const { server1: baseUrl } = useBaseUrl();
    const [qualifiedList, setqualifiedList] = useState([]);
    const [input, setInput] = useState({});
    const [unitList, setunitList] = useState([]);
    const [leastList, setLeastList] = useState([]);
    const [isEditbtn, setisEditbtn] = useState(false);
    const [isDatasending, setdatasending] = useState(false);
    const [formId, setFormId] = useState(0);



    useEffect(() => {
        getTechnicalEvalutionList();
        getUnitList()
    }, [])

    const getTechnicalEvalutionList = () => {
        axios.get(`${baseUrl}/api/technicalevalution/qualifiedlist`).then((resp) => {
            if (resp.status === 200) {
                setqualifiedList(resp.data.qualifiedList)
                generateLeastList(resp.data.qualifiedList.length);
            }
        })
    }

    const generateLeastList = (qualifiedListLen) => {

        const leastListArr = [];
        for (let i = 1; i <= qualifiedListLen; i++) {
            leastListArr.push({ value: 'L' + i, label: 'L' + i })
        }

        setLeastList(leastListArr)
        // console.log(leastListArr)
    }

    const getUnitList = () => {
        axios.get(`${baseUrl}/api/unitmasters/getUnitList`).then((resp) => {
            // console.log(resp.data)
            if (resp.status === 200) {
                setunitList(resp.data.unitList)
            }
        })
    }

    const unitChangeHandler = (selectedOptions, techsubid) => {

        setInput((prev) => {
            return {
                ...prev,
                [techsubid]: {
                    ...prev[techsubid],
                    unit: (selectedOptions) ? selectedOptions.value : ''
                },
            }
        })
    }

    // const unit_name = [
    //     {value : '1', label : 'Cubic Metric Ton'}
    // ]

    const amtchangehandler = (e, techsubid) => {

        setInput((prev) => {
            return {
                ...prev,
                [techsubid]: {
                    ...prev[techsubid],
                    amt: e.target.value
                }
            }
        })
    }

    const leastChangeHandler = (selectedOptions, techsubid) => {
        setInput((prev) => {
            return {
                ...prev,
                [techsubid]: {
                    ...prev[techsubid],
                    least: (selectedOptions) ? selectedOptions.value : ''
                },
            }
        })

        // let index = leastList.findIndex(option => option.value === selectedOptions.value)
        // console.log(index)


        // setLeastList((prev) => {

        //     prev[index] = {
        //         ... prev[index],
        //         isDisabled : !prev[index].isDisabled
        //     } 

        //   return  [
        //         ...prev,
        //     ]
        // })

    }
    
    const resetform = () => {
        setInput({})
    }

    let formIsValid = false;

    if(qualifiedList.length > 0){
        if(Object.keys(input).length > 0){

            for(const key in input){

                for (const key1 in input[key]){
                    if(input[key][key1]){
                        formIsValid = true;
                        break;
                    }
                }

                if(formIsValid){
                    break;
                }
             
            }
        }
    }

    const postData = (data) => {
        console.log(data)

    }

    const putData = () => {

    }

    const submitHandler = (e) => {
        e.preventDefault();

        setdatasending(true);

        if (!formIsValid) {
          setdatasending(false);
          return;
        }

        let data = {
            finEvaluation : input,
            tokenid: localStorage.getItem("token"),
            
        }

        if (formId === 0) {
            postData(data);
        } else if (formId > 0) {
            putData(data);
        }
    }

    console.log(input)
    return (
        <LockCard locked={!id}>
            <PreLoader loading={FetchLoading}>
                {qualifiedList.map((item) => {
                    return (
                        <div className="row mt-2 d-flex align-items-center mb-2" key={item.id}>
                            <div className="col-md-3 font-weight-bold">{item.compName}</div>
                            <div className="col-md-3">
                                <Select
                                    name={"unit" + item.id}
                                    id={"unit" + item.id}
                                    isSearchable="true"
                                    isClearable="true"
                                    options={unitList}
                                    onChange={(selectedOptions) => {
                                        unitChangeHandler(selectedOptions, item.id);
                                    }}
                                    value={input[item.id]?.unit ? unitList.find((x) => x.value === input[item.id]?.unit) : null}
                                // isLoading={StateOptions.isLoading}
                                // isDisabled={id ? true : false}
                                ></Select>
                            </div>
                            <div className="col-md-3">
                                <input
                                    type="number"
                                    className="form-control"
                                    id="amt"
                                    placeholder=""
                                    name="amt"
                                    value={input ? ((input[item.id]?.amt) ? input[item.id].amt : '') : ''}
                                    onChange={(e) => amtchangehandler(e, item.id)}
                                />
                            </div>
                            <div className="col-md-3">
                                <Select
                                    name={"least" + item.id}
                                    id={"least" + item.id}
                                    isSearchable="true"
                                    isClearable="true"
                                    options={leastList}
                                    onChange={(selectedOptions) => {
                                        leastChangeHandler(selectedOptions, item.id);
                                    }}
                                    value={input[item.id]?.least ? leastList.find((x) => x.value === input[item.id]?.least) : null}
                                // isLoading={StateOptions.isLoading}
                                // isDisabled={id ? true : false}
                                ></Select>
                            </div>
                        </div>
                    );
                })}
                <div className="col-lg-12 d-flex justify-content-center mt-4">
                    {!isEditbtn && (
                        <button
                            className={
                                !formIsValid
                                    ? "btn btn-outline-primary rounded-pill px-4"
                                    : "btn btn-primary rounded-pill px-4"
                            }
                            onClick = {submitHandler}
                            disabled={!formIsValid || isDatasending || FetchLoading}
                        >
                            {isDatasending && (
                                <span className="spinner-border spinner-border-sm mr-2"></span>
                            )}
                            {isDatasending && "Submitting..."}
                            {!isDatasending && "Submit"}
                        </button>
                    )}
                    {isEditbtn && (
                        <button
                            className={
                                !formIsValid
                                    ? "btn btn-outline-primary rounded-pill px-4"
                                    : "btn btn-primary rounded-pill px-4"
                            }
                            onClick = {submitHandler}
                            disabled={!formIsValid || isDatasending || FetchLoading}
                        >
                            {isDatasending && (
                                <span className="spinner-border spinner-border-sm mr-2"></span>
                            )}
                            {isDatasending && "Updating..."}
                            {!isDatasending && "Update"}
                        </button>
                    )}

                    <button
                        className="btn  btn-outline-dark rounded-pill mx-3"
                        onClick={resetform}
                        disabled={isDatasending || FetchLoading}
                    >
                        Clear
                    </button>
                </div>

            </PreLoader>
        </LockCard>
    )
}

export default FinancialEvalution

