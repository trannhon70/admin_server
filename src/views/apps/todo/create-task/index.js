import { Fragment, useState, useEffect } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import Flatpickr from "react-flatpickr";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import * as yup from "yup";

import { useDispatch, useSelector } from "react-redux";

import "@styles/react/apps/app-todo.scss";
import "@styles/react/libs/file-uploader/file-uploader.scss";
import OptionTask from "./OptionTask";
import { Button, Col, Form, FormFeedback, Input, Label, Row } from "reactstrap";
import Select, { components } from "react-select";
import { selectThemeColors, isObjEmpty } from "@utils";
import PerfectScrollbar from "react-perfect-scrollbar";

import "@styles/react/libs/react-select/_react-select.scss";
import {
  calculateProcessOption,
  priorityTaskOption,
  typeTaskOption,
} from "../../../../utility/Utils";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "@styles/react/libs/editor/editor.scss";
import { useDropzone } from "react-dropzone";
import { FileText, X, DownloadCloud, PlusCircle } from "react-feather";

const schema = yup.object().shape({
  name: yup.string().required("Tên công việc chưa nhập"),
  workload: yup
    .number()
    .min(1, "Khối lượng công việc tối thiểu là 1")
    .max(100, "Khối lượng công việc tối đa là 100")
    .required(),
});

const defaultValues = {
  name: "",
  workload: 100,
};

const iconOptions = [
  {
    value: "facebook",
    label: "Facebook",
  },
  {
    value: "twitter",
    label: "Twitter",
  },
  {
    value: "linkedin",
    label: "Linkedin",
  },
];

const OptionComponent = ({ data, ...props }) => {
  return <components.Option {...props}>{data.label}</components.Option>;
};

const CreateTask = () => {
  // ** States
  const [chosenOptionTask, setChosenOptionTask] = useState("information");
  const [start, setStart] = useState(new Date());
  const [finish, setFinish] = useState(new Date());
  const [startHour, setStartHour] = useState(new Date().setHours(9, 0));
  const [finishHour, setFinishHour] = useState(new Date().setHours(18, 30));
  const [assignByHour, setAssignByHour] = useState(false);
  const [description, setDescription] = useState(EditorState.createEmpty());
  const [files, setFiles] = useState([]);

  const [type, setType] = useState(typeTaskOption[0]);
  const [priority, setPriority] = useState(typeTaskOption[0]);
  const [calculateProcess, setCalculateProcess] = useState(
    calculateProcessOption[0]
  );

  const [jobs, setJobs] = useState([
    {
      id: new Date().getTime(),
      value: "",
    },
  ]);

  const {
    control,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues, resolver: yupResolver(schema) });

  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.todo);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles([...files, ...acceptedFiles.map((file) => Object.assign(file))]);
    },
  });

  const renderFilePreview = (file) => {
    if (file.type.startsWith("image")) {
      return (
        <img
          className="rounded"
          alt={file.name}
          src={URL.createObjectURL(file)}
          height="28"
          width="28"
        />
      );
    } else {
      return <FileText size="28" />;
    }
  };

  const handleRemoveFile = (file) => {
    const uploadedFiles = files;
    const filtered = uploadedFiles.filter((i) => i.name !== file.name);
    setFiles([...filtered]);
  };

  const renderFileSize = (size) => {
    if (Math.round(size / 100) / 10 > 1000) {
      return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`;
    } else {
      return `${(Math.round(size / 100) / 10).toFixed(1)} kb`;
    }
  };

  const handleChooseOption = (value) => {
    setChosenOptionTask(value);
  };

  const onSubmit = (data) => {
    trigger();
    console.log(data);
  };

  const renderCalculateProcess = {
    _1: <></>,
    _2: (
      <>
        <Col md={6} className="mt-2">
          <h6>Khối lượng cần hoàn thành</h6>
          <Controller
            id="workload"
            name="workload"
            control={control}
            render={({ field }) => (
              <Input
                className="mt-1"
                autoFocus
                type="number"
                id="workload"
                placeholder="Khối lượng công việc"
                invalid={Boolean(errors?.workload)}
                aria-describedby="validation-add-board"
                {...field}
              />
            )}
          />
          {errors.name && (
            <FormFeedback className="d-block">
              {errors.workload?.message}
            </FormFeedback>
          )}
        </Col>
        <Col md={6} className="mt-2">
          <h6>Đơn vị</h6>
          <Input
            className="mt-1"
            readOnly
            aria-describedby="validation-add-board"
            value={"Cái"}
          />
        </Col>
      </>
    ),
    _3: (
      <Col xs={12} className="mt-2">
        <h6>Danh sách đầu việc</h6>
        <div className="d-flex align-items-center mt-1">
          <Input aria-describedby="validation-add-board" />
          <a style={{ marginLeft: "8px" }}>
            <X />
          </a>
        </div>
        <a className="mt-1">
          <PlusCircle />
        </a>
      </Col>
    ),
    _4: <div>4</div>,
  };

  const render = {
    information: (
      <>
        <Row>
          <h4 className="fw-bolder mb-2">THÔNG TIN CHUNG</h4>

          <Col className="mb-2" md={12}>
            <h6>
              Tên công việc <i></i>
            </h6>
            <Controller
              id="name"
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  className="mt-1"
                  autoFocus
                  id="name"
                  placeholder="Tên công việc"
                  invalid={Boolean(errors?.name)}
                  aria-describedby="validation-add-board"
                  {...field}
                />
              )}
            />
            {errors.name && (
              <FormFeedback className="d-block">
                {errors.name?.message}
              </FormFeedback>
            )}
          </Col>

          <>
            <Col className="mb-2" md={6}>
              <h6>Bắt đầu</h6>

              <Row>
                <Col md={4}>
                  <Flatpickr
                    className="form-control"
                    value={startHour}
                    id="timepicker"
                    disabled={!assignByHour}
                    options={{
                      enableTime: true,
                      noCalendar: true,
                      dateFormat: "H:i",
                      time_24hr: true,
                    }}
                    onChange={(date) => startHour(date)}
                  />
                </Col>
                <Col md={8}>
                  <Flatpickr
                    value={start}
                    onChange={(date) => setStart(date?.[0] || new Date())}
                    className="form-control invoice-edit-input date-picker"
                  />
                </Col>
              </Row>
            </Col>
            <Col className="mb-2" md={6}>
              <h6>Kết thúc</h6>

              <Row>
                <Col md={4}>
                  <Flatpickr
                    className="form-control"
                    value={finishHour}
                    id="timepicker"
                    disabled={!assignByHour}
                    options={{
                      enableTime: true,
                      noCalendar: true,
                      dateFormat: "H:i",
                      time_24hr: true,
                    }}
                    onChange={(date) => setFinishHour(date)}
                  />
                </Col>
                <Col md={8}>
                  <Flatpickr
                    value={finish}
                    onChange={(date) => setFinish(date?.[0] || new Date())}
                    className="form-control invoice-edit-input date-picker"
                  />
                </Col>
              </Row>
            </Col>
            <Col className="mb-2" md={12}>
              <div className="form-check form-check-inline">
                <Input
                  type="checkbox"
                  checked={assignByHour}
                  onChange={() => setAssignByHour(!assignByHour)}
                  id="basic-cb-checked"
                />
                <Label for="basic-cb-checked" className="form-check-label">
                  Giao việc theo giờ
                </Label>
              </div>
            </Col>
          </>

          <Col xs={12} className="mb-2">
            <h6>Người thực hiện</h6>
            <Select
              isMulti
              placeholder="Chọn người thực hiện"
              options={iconOptions}
              className="react-select"
              classNamePrefix="select"
              components={{
                Option: OptionComponent,
              }}
            />
          </Col>

          <Col xs={12} className="mb-2">
            <h6>Người giao việc</h6>
            <Select
              isMulti
              placeholder="Chọn người giao việc"
              options={iconOptions}
              className="react-select"
              classNamePrefix="select"
              components={{
                Option: OptionComponent,
              }}
            />
          </Col>

          <Col xs={12} className="mb-2">
            <h6>Người theo dõi/phối hợp thực hiện</h6>
            <Select
              isMulti
              placeholder="Chọn người theo dõi/phối hợp thực hiện"
              options={iconOptions}
              className="react-select"
              classNamePrefix="select"
              components={{
                Option: OptionComponent,
              }}
            />
          </Col>

          <h4 className="fw-bolder my-2">CÀI ĐẶT NÂNG CAO</h4>

          <Col md={7}>
            <h6>Loại công việc</h6>
            <Select
              placeholder="Chọn loại công việc"
              options={typeTaskOption}
              value={type}
              className="react-select"
              classNamePrefix="select"
            />
          </Col>

          <Col md={5}>
            <h6>Ưu tiên</h6>
            <Select
              placeholder="Chọn ưu tiên"
              options={priorityTaskOption}
              value={priority}
              className="react-select"
              classNamePrefix="select"
            />
          </Col>
          <Col md={12} className="mt-2">
            <h6>Cách tính tiến độ công việc</h6>
            <Select
              placeholder="Chọn cách tính tiến độ công việc"
              value={calculateProcess}
              options={calculateProcessOption}
              onChange={(data) => setCalculateProcess(data)}
              className="react-select"
              classNamePrefix="select"
            />
          </Col>

          {renderCalculateProcess[`_${calculateProcess?.value}`]}

          <>
            <Col md={12} className="mt-2">
              <h6>Dự án</h6>
              <Select
                placeholder="Dự án"
                className="react-select"
                classNamePrefix="select"
              />
            </Col>

            <Col md={12} className="mt-2">
              <h6>Công việc cha</h6>
              <Select
                placeholder="Công việc cha"
                className="react-select"
                classNamePrefix="select"
              />
            </Col>
          </>

          <Col md={12} className="mt-2">
            <h6>Mô tả</h6>
            <Editor
              editorState={description}
              onEditorStateChange={(data) => setDescription(data)}
            />
          </Col>

          <Col md={12} className="mt-2">
            <h6>Đính kèm</h6>
            <div
              {...getRootProps({ className: "dropzone" })}
              style={{ minHeight: "200px" }}
            >
              <input {...getInputProps()} />
              <div className="d-flex align-items-center justify-content-center flex-column">
                <DownloadCloud size={64} />
                <h5>Drop Files here or click to upload</h5>
                <p className="text-secondary">
                  Drop files here or click{" "}
                  <a href="/" onClick={(e) => e.preventDefault()}>
                    browse
                  </a>{" "}
                  thorough your machine
                </p>
              </div>
            </div>
            {files.length ? (
              <Fragment>
                <ListGroup className="my-2">{fileList}</ListGroup>
                <div className="d-flex justify-content-end">
                  <Button
                    className="me-1"
                    color="danger"
                    outline
                    onClick={handleRemoveAllFiles}
                  >
                    Remove All
                  </Button>
                  <Button color="primary">Upload Files</Button>
                </div>
              </Fragment>
            ) : null}
          </Col>
        </Row>
      </>
    ),
  };

  return (
    <Fragment>
      <OptionTask
        handleChooseOption={handleChooseOption}
        chosen={chosenOptionTask}
      />
      <div className="content-right">
        <div className="content-wrapper">
          <div className="content-body create-task-wrapper">
            <PerfectScrollbar
              className="list-group"
              options={{ wheelPropagation: false }}
              containerRef={(ref) => {
                if (ref) {
                  ref._getBoundingClientRect = ref.getBoundingClientRect;

                  ref.getBoundingClientRect = () => {
                    const original = ref._getBoundingClientRect();

                    return { ...original, height: Math.floor(original.height) };
                  };
                }
              }}
            >
              <Form onSubmit={handleSubmit(onSubmit)} className="p-2">
                {render[chosenOptionTask]}
                <Row>
                  <Col className="mt-2" xs={12}>
                    <Button type="submit" color="primary">
                      Tạo công việc
                    </Button>
                  </Col>
                </Row>
              </Form>
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CreateTask;
