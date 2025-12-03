Database Backup & Sync Configuration
I have configured your database setup to be more production-ready.

Changes
Shadow Database:
Updated
schema.prisma
to use the provided Shadow DB URL.
This ensures safe migrations by detecting schema drift.
Backup Scripts:
JSON Backup (Recommended): npm run db:backup:json
Dynamic: Automatically detects all tables in your database. If you add new tables later, they will be backed up automatically.
No Dependencies: Works immediately without installing extra tools.
SQL Backup: npm run db:backup
Uses pg_dump to create a full SQL snapshot.
Requires PostgreSQL Command Line Tools to be installed.
Limitations & Future Considerations
JSON Restore: Restoring from JSON requires a custom script to read the file and insert data back into the database. It is not as simple as running a single command like with SQL dumps.
SQL Dump: The db:backup script is the "gold standard" for backups as it captures everything (indexes, views, etc.) and is easy to restore. I recommend installing PostgreSQL tools eventually to use this.
Verification
Shadow DB: Configuration is valid.
JSON Backup: Verified successfully. The script dynamically found and backed up: Submission, User, Challenge, Participant, WorkshopApplication.
