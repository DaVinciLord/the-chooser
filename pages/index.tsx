import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Tooltip,
  Theme,
  Box,
  makeStyles,
  createStyles
} from "@material-ui/core";
import uniqueid from "lodash.uniqueid";

import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@material-ui/icons/Search";
import useInput from "../src/useInput";

const sortNames = (name1: Name, name2: Name) =>
  name1.value.localeCompare(name2.value);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      "& > :first-child": {
        flex: "1 1 auto",
        marginRight: theme.spacing(3)
      }
    }
  })
);

type Name = {
  id: string;
  value: string;
};

export default function Index() {
  const name = useInput("");
  const numberToChoose = useInput("5");
  const [names, setNames] = useState<Name[]>([]);
  const [choosenNames, setChoosenNames] = useState<Name[]>([]);
  const classes = useStyles();
  const onClickDelete = (id: string) => {
    const idx = names.findIndex((x: Name) => x.id === id);
    setNames([...names.slice(0, idx), ...names.slice(idx + 1)]);
  };
  const onSubmitName = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const newNames = name.value
      .split(", ")
      .map((x: string) => ({ id: uniqueid(), value: x.trim() }));
    setNames([...names, ...newNames].sort(sortNames));
    name.forceChange("");
  };

  const onSubmitChoose = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const choosenNames = [];
    let restNames = [...names];
    const namesLength = names.length;
    const length =
      Number(numberToChoose.value) < namesLength
        ? Number(numberToChoose.value)
        : namesLength;
    for (let i = 0; i < length; ++i) {
      const nameIdx = Math.floor(Math.random() * restNames.length);
      choosenNames.push(restNames[nameIdx]);
      restNames = [
        ...restNames.slice(0, nameIdx),
        ...restNames.slice(nameIdx + 1)
      ];
    }

    setChoosenNames(choosenNames);
    setNames(restNames);
  };

  return (
    <Grid container spacing={3} alignItems="center">
      <Grid item xs={12}>
        <form id="add-name" className={classes.root} onSubmit={onSubmitName}>
          <TextField
            id="name"
            variant="outlined"
            label="Nom(s)"
            value={name.value}
            onChange={name.onChange}
            fullWidth
          />
          <Tooltip title="Ajouter">
            <Box flex="0 1 auto">
              <Box height="100%" clone>
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  disabled={!name.value}
                >
                  <AddIcon />
                </Button>
              </Box>
            </Box>
          </Tooltip>
        </form>
      </Grid>
      <Grid item xs={12}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {names.map(name => (
              <TableRow key={name.id}>
                <TableCell>{name.value}</TableCell>
                <TableCell>
                  <Tooltip title="Supprimer">
                    <IconButton
                      color="secondary"
                      onClick={() => onClickDelete(name.id)}
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
      <Grid item xs={12}>
        <form id="choose" className={classes.root} onSubmit={onSubmitChoose}>
          <TextField
            id="numberToChoose"
            type="number"
            variant="outlined"
            label="Nombre à Choisir"
            value={numberToChoose.value}
            onChange={numberToChoose.onChange}
            inputProps={{ min: 1 }}
            fullWidth
            required
          />
          <Tooltip title="Choisir">
            <Button color="primary" variant="contained" type="submit">
              <SearchIcon />
            </Button>
          </Tooltip>
        </form>
      </Grid>
      {choosenNames.length > 0 && (
        <Grid item xs={12}>
          <Typography variant="h4">
            {choosenNames.length > 1
              ? `Les Noms choisis sont : ${choosenNames
                  .map(x => x.value)
                  .join(", ")}`
              : `Le Nom choisi est : ${choosenNames
                  .map(x => x.value)
                  .join(", ")}`}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
}
