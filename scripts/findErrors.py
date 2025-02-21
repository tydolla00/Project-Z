import json
import os

def get_Input(input_path=None):
    # Get the directory where the script is located
    script_dir = os.path.dirname(os.path.abspath(__file__))

    # Get input for file paths - using .json extension
    default_input = os.path.join(script_dir, "genetic-apex", "genetic-apex.json")
    default_output = os.path.join(script_dir, "genetic-apex", "genetic-apex-errors.txt")

    # Use provided path or ask for input
    file_to_read = input_path if input_path else input(f"Enter path to HTML file (default: {default_input}): ").strip()
    if not file_to_read:
        file_to_read = default_input

    # If input_path is relative, make it absolute using script_dir
    if input_path and not os.path.isabs(input_path):
        file_to_read = os.path.join(script_dir, input_path)

    file_to_write = default_output

    # Validate files
    if not os.path.exists(file_to_read):
        raise FileNotFoundError(f"Input file not found: {file_to_read}")
    
    return file_to_read, file_to_write

def find_missing_fields(data):
    # Define expected fields and their required subfields
    required_fields = {
        "set": ["setName", "image", "pokedex"],
        "thumbnail": None,
        "name": None,
        "url": None,
        "details": ["hp", "type", "weakness", "retreat"],
        "expansion": None
    }

    missing_data = []
    
    for idx, card in enumerate(data):
        missing = {
            "index": idx, 
            "name": card.get("name"), 
            "pokedex": card.get("set", {}).get("pokedex"), 
            "missing": []
        }
        
        # Check main fields
        for field, subfields in required_fields.items():
            if field not in card:
                missing["missing"].append(field)
                continue
                
            # Check subfields if any
            if subfields and field in card:
                for subfield in subfields:
                    if subfield not in card[field] or not card[field][subfield]:
                        missing["missing"].append(f"{field}.{subfield}")
        
        # Add to results if missing fields found
        if missing["missing"]:
            missing_data.append(missing)
    
    return missing_data

# Get input from user
file_to_read, _ = get_Input("./genetic-apex/genetic-apex.json")
# Read the JSON file
with open(file_to_read, 'r') as f:
    data = json.load(f)

missing_data = find_missing_fields(data)

# Print results in a readable format
print("\nCards with missing fields:")
print("==========================")
for card in missing_data:
    print(f"\nCard {card['name']} {card['pokedex']}:")
    print(f"Missing fields: {', '.join(card['missing'])}")