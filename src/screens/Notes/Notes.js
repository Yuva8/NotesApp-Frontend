import Mainscreen from "../../components/mainscreen";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import * as React from "react";
import Accordion from "@material-ui/core/Accordion";
import Typography from "@material-ui/core/Typography";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../../actions/noteActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/Errormessage";
const Notes = ({ search }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const noteList = useSelector((state) => state.noteList);
  const { loading, error, notes } = noteList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const deletehandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
  };

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      navigate("/");
    }
  }, [
    dispatch,
    userInfo,
    navigate,
    successCreate,
    successUpdate,
    successDelete,
  ]);

  return (
    <Mainscreen title={`Welcome back ${userInfo.name}...`}>
      <Link to="/createnote">
        <Button variant="dark" size="lg">
          Create New Note
        </Button>
        <hr></hr>
      </Link>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loading && <Loading />}
      {loadingDelete && <Loading />}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {notes
        ?.filter((filteredNote) =>
          filteredNote.title.toLowerCase().includes(search.toLowerCase())
        )
        .reverse()
        .map((note) => (
          <div key={note._id}>
            <Accordion style={{ margin: 10 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon style={{ color: "black" }} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography
                  style={{
                    color: "black",
                    textDecoration: "none",
                    flex: 1,
                    cursor: "pointer",
                    alignSelf: "center",
                    fontSize: 19,
                  }}
                >
                  {note.title}
                </Typography>
                <Button variant="outline-dark" href={`https://roaring-faloodeh-ccdfde.netlify.app/note/${note._id}`}>
                  Edit
                </Button>

                <Button
                  variant="dark"
                  className="mx-2"
                  onClick={() => deletehandler(note._id)}
                >
                  Delete
                </Button>
              </AccordionSummary>
              <AccordionDetails style={{ height: "50px" }}>
                <h3>
                  <p class="badge bg-info">Category - {note.category}</p>
                </h3>
              </AccordionDetails>
              <AccordionDetails style={{ height: "40px" }}>
                <h5>{note.content}</h5>
              </AccordionDetails>
              <AccordionDetails>
                <>Created on {note.createdAt.substring(0, 10)}</>
              </AccordionDetails>
            </Accordion>
          </div>
        ))}
    </Mainscreen>
  );
};

export default Notes;
