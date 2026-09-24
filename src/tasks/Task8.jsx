import { useState } from "react";
import TagsInput from "../components/TagsInput";

function Task8() {
  const [tags, setTags] = useState([]);

  return (
    <div className="p-10">
      <TagsInput
        value={tags}
        onChange={setTags}
        placeholder="Add skills..."
      />

      <p className="mt-4">
        Selected tags: {tags.join(", ")}
      </p>
    </div>
  );
}

export default Task8;