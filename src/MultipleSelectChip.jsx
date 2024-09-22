import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip(props) {
  const { genres, setSelected, selected } = props
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    console.log(value);

    setSelected(
      typeof value === 'string' ? value.split(',') : value,
    )
  };

  React.useEffect(() => {
    console.log(personName);
  }, [personName])



  return (
    <div>
      <FormControl sx={{ width: 300 }}>
        <InputLabel >Genre</InputLabel>
        <Select
          multiple
          value={selected}
          onChange={handleChange}
          input={<OutlinedInput label="Genre" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((genre, i) => (
                <Chip key={i} label={genre.name} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {genres.map((genre, i) => (
            <MenuItem
              key={i}
              value={genre}
              style={getStyles(genre.name, personName, theme)}
            >
              {genre.name} {genre.count}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
