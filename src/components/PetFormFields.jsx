const PetFormFields = ({ formData, setFormData, readOnlyOwnerEmail = false }) => {
  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <label>
        Pet Name
        <input required value={formData.petName} onChange={(e) => handleChange("petName", e.target.value)} />
      </label>
      <label>
        Species
        <input required value={formData.species} onChange={(e) => handleChange("species", e.target.value)} />
      </label>
      <label>
        Breed
        <input required value={formData.breed} onChange={(e) => handleChange("breed", e.target.value)} />
      </label>
      <label>
        Age
        <input required value={formData.age} onChange={(e) => handleChange("age", e.target.value)} />
      </label>
      <label>
        Gender
        <select required value={formData.gender} onChange={(e) => handleChange("gender", e.target.value)}>
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </label>
      <label>
        Image URL
        <input required value={formData.imageUrl} onChange={(e) => handleChange("imageUrl", e.target.value)} />
      </label>
      <label>
        Health Status
        <input
          required
          value={formData.healthStatus}
          onChange={(e) => handleChange("healthStatus", e.target.value)}
        />
      </label>
      <label>
        Vaccination Status
        <input
          required
          value={formData.vaccinationStatus}
          onChange={(e) => handleChange("vaccinationStatus", e.target.value)}
        />
      </label>
      <label>
        Location
        <input required value={formData.location} onChange={(e) => handleChange("location", e.target.value)} />
      </label>
      <label>
        Adoption Fee
        <input
          required
          type="number"
          min="0"
          value={formData.adoptionFee}
          onChange={(e) => handleChange("adoptionFee", Number(e.target.value))}
        />
      </label>
      <label>
        Description
        <textarea
          required
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </label>
      <label>
        Owner Email
        <input
          required
          value={formData.ownerEmail}
          readOnly={readOnlyOwnerEmail}
          onChange={(e) => handleChange("ownerEmail", e.target.value)}
        />
      </label>
    </>
  );
};

export default PetFormFields;
