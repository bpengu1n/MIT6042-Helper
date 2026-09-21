#!/usr/bin/env bash
# Download MIT 6.042J (Fall 2010) lecture videos from the Internet Archive.
# Source: https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/
# Licensed CC BY-NC-SA 4.0 by MIT OpenCourseWare.
#
# Usage: ./download-6042j.sh [output_dir]
# Safe to re-run: existing complete files are skipped, partials are resumed.

set -euo pipefail

BASE="https://archive.org/download/MIT6.042JF10"
OUT="${1:-6042j-videos}"

titles=(
  "Introduction and Proofs"
  "Induction"
  "Strong Induction"
  "Number Theory I"
  "Number Theory II"
  "Graph Theory and Coloring"
  "Matching Problems"
  "Graph Theory II - Minimum Spanning Trees"
  "Communication Networks"
  "Graph Theory III"
  "Relations, Partial Orders, and Scheduling"
  "Sums"
  "Sums and Asymptotics"
  "Divide and Conquer Recurrences"
  "Linear Recurrences"
  "Counting Rules I"
  "Counting Rules II"
  "Probability Introduction"
  "Conditional Probability"
  "Independence"
  "Random Variables"
  "Expectation I"
  "Expectation II"
  "Large Deviations"
  "Random Walks"
)

mkdir -p "$OUT"
cd "$OUT"

for i in "${!titles[@]}"; do
  n=$(printf "%02d" $((i + 1)))
  # strip characters that make filenames awkward across filesystems
  safe=$(printf '%s' "${titles[$i]}" | tr -d '/:*?"<>|')
  dest="Lec ${n} - ${safe}.mp4"

  if [[ -f "$dest" ]]; then
    echo "[skip] $dest"
    continue
  fi

  echo "[get ] $dest"
  curl -L --fail --retry 3 --retry-delay 2 -C - \
       -o "${dest}.part" "${BASE}/MIT6_042JF10_lec${n}_300k.mp4"
  mv "${dest}.part" "$dest"
done

echo
echo "Done. $(ls -1 *.mp4 2>/dev/null | wc -l) files in $(pwd)"
