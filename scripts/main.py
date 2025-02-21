from bs4 import BeautifulSoup
import json
import os

def parse_table(html):
    soup = BeautifulSoup(html, 'html.parser')
    rows = soup.find_all('tr')
    cards = []
    
    # Skip header row
    for row in rows[1:]:
        cols = row.find_all('td')
        if not cols or len(cols) < 5:  # Skip empty or incomplete rows
            continue
            
        try:
            # Parse first td - set info
            set_td = cols[0]
            set_info = {
                "setName": set_td.find('a').text.strip() if set_td.find('a') else "",
                "image": set_td.find('img')['src'] if set_td.find('img') else "",
                "pokedex": next((text.strip() for text in set_td.text.strip().split('\n') if '/' in text), "")
            }
            
            # Parse second td - thumbnail
            thumbnail = cols[1].find('img')['src'] if cols[1].find('img') else ""
            
            # Parse third td - name (handle both font tag and direct text)
            name_td = cols[2]
            font_tag = name_td.find('font')
            if font_tag:
                name = font_tag.text.strip()
            else:
                a_tag = name_td.find('a')
                if a_tag:
                    name = a_tag.text.strip()
                
            if name and name_td.text.strip().endswith('ex'):
                name += ' ex'
            
            # Get URL from the anchor tag in the third td
            url = name_td.find('a')['href'] if name_td.find('a') else ""

            # Parse fourth td - card details
            details_table = cols[3].find('table')
            details = {
                "hp": "",
                "type": "",
                "weakness": {"image": "", "value": "20"},
                "retreat": {"image": "", "count": "0"}
            }
            
            if details_table:
                table_rows = details_table.find_all('tr')
                if table_rows:
                    # First row for HP and type
                    first_row = table_rows[0]
                    hp_tag = first_row.find('b')
                    if hp_tag:
                        details["hp"] = hp_tag.text.strip()
                    type_img = first_row.find('img')
                    if type_img:
                        details["type"] = type_img['src']
                    
                    # Last row for weakness and retreat
                    last_row = table_rows[-1]
                    weakness_cell = last_row.find_all('td')[0] if last_row.find_all('td') else None
                    retreat_cell = last_row.find_all('td')[1] if len(last_row.find_all('td')) > 1 else None
                    
                    if weakness_cell:
                        weakness_img = weakness_cell.find('img')
                        if weakness_img:
                            details["weakness"]["image"] = weakness_img['src']
                            # Extract just the numeric value after the image
                            weakness_text = weakness_cell.get_text().strip()
                            if '+' in weakness_text:
                                details["weakness"]["value"] = weakness_text.split('+')[1].strip()
                    
                    if retreat_cell:
                        retreat_images = retreat_cell.find_all('img')
                        if retreat_images:
                            details["retreat"]["image"] = retreat_images[0]['src']
                            details["retreat"]["count"] = str(len(retreat_images))

            # Parse fifth td - expansion (extract just filename)
            expansion = ""
            expansion_td = cols[-1]
            if expansion_td:
                img_tag = expansion_td.find('img')
                if img_tag and 'src' in img_tag.attrs:
                    # Extract just the filename from the path
                    expansion = img_tag['src']
            
            card = {
                "set": set_info,
                "thumbnail": thumbnail,
                "name": name,
                "url": url,
                "details": details,
                "expansion": expansion
            }
            
            cards.append(card)
            
        except (IndexError, AttributeError) as e:
            print(f"Warning: Could not parse row: {e}")
            continue
            
    return json.dumps(cards, indent=4)

def get_Input(input_path=None):
    # Get the directory where the script is located
    script_dir = os.path.dirname(os.path.abspath(__file__))

    # Get input for file paths
    default_input = os.path.join(script_dir, "genetic-apex", "genetic-apex.html")
    default_output = os.path.join(script_dir, "genetic-apex", "genetic-apex.json")

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

# ? Start of the script

# Get input file paths
file_to_read, file_to_write = get_Input("genetic-apex/genetic-apex.html")
# Example usage
with open(file_to_read, 'r') as file:
    html = file.read()

parsed_json = parse_table(html)

# Create directory for output file if it doesn't exist
os.makedirs(os.path.dirname(os.path.abspath(file_to_write)), exist_ok=True)

# Write the parsed JSON to a file
with open(file_to_write, 'w') as json_file:
    json_file.write(parsed_json)

print(f"Reading from: {file_to_read}")
print(f"Writing to: {file_to_write}")
print(parsed_json)
