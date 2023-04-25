export const Filter = ({field, label, options, type, onChange}) => {
  return (
    <>
      <label for="mag" class="form-label text-capitalize" >
        {label}
      </label>
      <select
        name={field}
        class="form-select"
        required
        data-type={type} 
        onChange={onChange}
      >
        <option value="">Aucun filtre...</option>
        {options && (
            options.map(option => (
                <option value={option.value}>{option.name}</option>
            ))
        )}
      </select>
    </>
  );
};
