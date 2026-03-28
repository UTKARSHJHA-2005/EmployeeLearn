<pre>
cd frontend
npm install
npm run dev
</pre>

<pre>
cd backend
pip install -r requirements.txt
python seed.py          # seed MongoDB with courses (run once)
uvicorn main:app --reload --port 8000
</pre>
