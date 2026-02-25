#!/bin/bash
# Fetch all 4-year schools from College Scorecard API
# Run with: bash scripts/fetch_all_schools.sh [API_KEY]
# If no API key provided, uses DEMO_KEY with delays

API_KEY="${1:-DEMO_KEY}"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
OUTPUT_DIR="$SCRIPT_DIR/../data"
mkdir -p "$OUTPUT_DIR"

FIELDS="id,school.name,school.city,school.state,school.ownership,school.locale,latest.cost.tuition.in_state,latest.cost.tuition.out_of_state,latest.cost.avg_net_price.overall,latest.cost.attendance.academic_year,latest.cost.attendance.program_year,latest.cost.net_price.public.by_income_level.0-30000,latest.cost.net_price.public.by_income_level.30001-48000,latest.cost.net_price.public.by_income_level.48001-75000,latest.cost.net_price.public.by_income_level.75001-110000,latest.cost.net_price.public.by_income_level.110001-plus,latest.cost.net_price.private.by_income_level.0-30000,latest.cost.net_price.private.by_income_level.30001-48000,latest.cost.net_price.private.by_income_level.48001-75000,latest.cost.net_price.private.by_income_level.75001-110000,latest.cost.net_price.private.by_income_level.110001-plus,latest.aid.median_debt.completers.overall,latest.completion.rate_suppressed.four_year,latest.student.size,latest.admissions.admission_rate.overall"

BASE_URL="https://api.data.gov/ed/collegescorecard/v1/schools.json"

echo "Starting College Scorecard data fetch..."
echo "API Key: ${API_KEY:0:10}..."
echo "Output: $OUTPUT_DIR"

# Get total count
TOTAL=$(curl -s "$BASE_URL?api_key=$API_KEY&school.degrees_awarded.predominant=3&per_page=1" | jq '.metadata.total')
echo "Total schools: $TOTAL"

# Calculate pages needed (100 per page)
PAGES=$(( (TOTAL + 99) / 100 ))
echo "Pages to fetch: $PAGES"

# Fetch each page
for ((page=0; page<PAGES; page++)); do
  echo "Fetching page $page of $PAGES..."

  curl -s "$BASE_URL?api_key=$API_KEY&school.degrees_awarded.predominant=3&per_page=100&page=$page&fields=$FIELDS" \
    | jq '.results' > "$OUTPUT_DIR/page_$page.json"

  COUNT=$(cat "$OUTPUT_DIR/page_$page.json" | jq 'length')
  echo "  Got $COUNT schools"

  # If using DEMO_KEY, add delay to avoid rate limit
  if [ "$API_KEY" = "DEMO_KEY" ]; then
    sleep 2
  fi
done

# Combine all pages into single file
echo "Combining all pages..."
cat "$OUTPUT_DIR"/page_*.json | jq -s 'add' > "$OUTPUT_DIR/all_schools.json"

TOTAL_FETCHED=$(cat "$OUTPUT_DIR/all_schools.json" | jq 'length')
echo "Total schools fetched: $TOTAL_FETCHED"

# Generate summary stats
echo "Generating summary..."
cat "$OUTPUT_DIR/all_schools.json" | jq '{
  total: length,
  by_state: (group_by(.["school.state"]) | map({state: .[0]["school.state"], count: length}) | sort_by(-.count)),
  has_net_price: [.[] | select(
    .["latest.cost.net_price.public.by_income_level.48001-75000"] != null or
    .["latest.cost.net_price.private.by_income_level.48001-75000"] != null
  )] | length,
  has_coa: [.[] | select(
    .["latest.cost.attendance.academic_year"] != null or
    .["latest.cost.attendance.program_year"] != null
  )] | length,
  has_debt: [.[] | select(.["latest.aid.median_debt.completers.overall"] != null)] | length,
  has_completion: [.[] | select(.["latest.completion.rate_suppressed.four_year"] != null)] | length
}' > "$OUTPUT_DIR/summary.json"

cat "$OUTPUT_DIR/summary.json"

# Clean up page files
rm -f "$OUTPUT_DIR"/page_*.json

echo "Done! Data saved to $OUTPUT_DIR/all_schools.json"
