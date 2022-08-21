import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField
} from '@mui/material';
import PropTypes from 'prop-types';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { useTheme } from '@mui/material/styles';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { mockup } from './mockup';
import axios from 'axios';

const TextFieldWrapper = styled(TextField)`
  fieldset {
    border-radius: 0;
  }
`;

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const Home = () => {
  const [source, setSource] = useState("");
  const [target, setTarget] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    document.title = "HOME"
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const postText = async () => {
    console.log(source)
    await axios.post(process.env.REACT_APP_API_TRANSLATE, {
      user_input: `${source}`
    })
    .then((response) => {
      console.log(response)
      setTarget(response.data.output.result);
    });
  };


  return (
    <Box
      component="main"
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Container>
        <Grid container>
          <Grid item xs={6}>
            <TextFieldWrapper
              id="translation-source"
              label="신조어를 입력하세요."
              value={source}
              variant="outlined"
              multiline
              rows={6}
              fullWidth
              inputProps={{
                style: {
                  fontSize: "1.2rem",
                }
              }}
              onChange={e => setSource(e.target.value)}
            />
          </Grid>
          
          <Grid item xs={6}>
            <TextFieldWrapper
              id="translation-target"
              variant="outlined"
              value={target}
              multiline
              rows={6}
              fullWidth
              inputProps={{
                style: {
                  fontSize: "1.2rem",
                }
              }}
            />
          </Grid>
        </Grid>

        <Box
          display="flex"
          justifyContent="flex-end"
          mt={1.2}
        >
          <Grid container spacing={1} width="200px">
            <Grid item xs={6}>
              <Button
                variant="outlined"
                fullWidth
                style={{
                  fontSize: "16px"
                }}
              >
                클리어
              </Button>
            </Grid>

            <Grid item xs={6}>
              <Button
                variant="contained"
                fullWidth
                style={{
                  fontSize: "16px"
                }}
                onClick={postText}
              >
                번역
              </Button>
            </Grid>
          </Grid>
        </Box>

        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>시간</TableCell>
                <TableCell>입력한 문장</TableCell>
                <TableCell>번역된 문장</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {(rowsPerPage > 0
                ? mockup.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : mockup
              ).map((item, i) => {
                const date = `${item.createdAt.toLocaleDateString('ko-KR')} ${item.createdAt.toLocaleTimeString('ko-KR')}`;

                return (
                  <TableRow
                    key={item.id}
                  >
                    <TableCell>
                      {date}
                    </TableCell>
                    <TableCell>
                      {item.input}
                    </TableCell>
                    <TableCell>
                      {item.output}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={3}
                  count={mockup.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
};

export default Home;
