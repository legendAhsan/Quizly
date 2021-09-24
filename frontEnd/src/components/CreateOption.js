import React from "react";

const CreateOption = (props) => {
	return (
		<div>
			<input
				type="text"
				className="form-control-file col-md-6"
				placeholder="option"
				onChange={(e) =>
					props.updateOption(
						props.questionID,
						props.ansID,
						e.target.value,
					)
				}
			/>
			<div class="form-check">
				<input
					class="form-check-input col-md-3"
					onClick={(e) =>
						props.updateCorrectOption(
							props.questionID,
							e.target.value,
						)
					}
					value={props.ansID}
					type="radio"
					name={"flexRadioDefault".concat(props.questionID)}
				/>
			</div>
		</div>
	);
};

export default CreateOption;
