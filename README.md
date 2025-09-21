# TaskTracker Application

## 🧠 Approach and Thought Process

My development approach focused on **AI-augmented rapid development** with strategic human oversight:

**Planning**: Used AI to break down requirements and identify architectural challenges upfront **Implementation**: Leveraged AI for scaffolding and boilerplate, human judgment for business logic **Quality**: AI-generated comprehensive test cases and documentation, human validation for UX decisions

## 🤖 AI Tools and Models Used

**Generative AIs**: Used Claude as my primary tool, along with a bit of DeepSeek.

**GitHub Copilot**: A real game changer - helps me a lot in all of my projects. It makes essential and spot on suggestions if I just write the template name correctly.

## 🔍 Reflections on Effectiveness

### What Worked Well
-   **Architecture planning with Claude**: Reduced planning time by 60%, identified edge cases early
-   **Rapid development with Copilot**: 3x faster coding for components and type definitions
-   **Documentation**: Helped me templating this documentation, saved at least 50% of my time if I had to do it manually.

### What Didn't Work
-   **Complex business logic**: AI suggestions were too generic, needed human domain expertise
-   **UX decisions**: AI lacks user psychology understanding, required human judgment
-   **Wrong component properties**: Wrong properties were generated couple of times, need to fix them manually.


# Prerequisites
-   Docker    
-   Docker Compose

# Clone the repository
git clone https://github.com/shaonzx/TaskTracker.git
cd TaskTracker

# Start all services
docker-compose up --build

### Access the Application
-   **Frontend**: [http://localhost:3000](http://localhost:3000)    
-   **Backend API**: [http://localhost:5000](http://localhost:5000)    
-   **Database**: localhost:5432    

## 📁 Project Structure
TaskTracker/
├── TaskTracker.API/          # .NET Core Backend API
├── tasktracker.frontend/     # Frontend Application (React/Angular/Vue)
├── docker-compose.yml        # Docker configuration
├── .gitignore               # Git ignore rules
└── README.md                # Documentation

# Start services in detached mode
docker-compose up -d --build

# View logs
docker-compose logs

# Stop services
docker-compose down

# Rebuild specific service
docker-compose up --build api

## 🗄️ Database Information

-   **Type**: PostgreSQL    
-   **Host**: localhost
-   **Port**: 5432    
-   **Database**: TaskTrackerDB   
-   **Username**: postgres    
-   **Password**: candy@pass
    

## 🔧 Troubleshooting

### Common Issues
1.  **Port conflicts**: Ensure ports 3000, 5000, and 5432 are available    
2.  **Docker not running**: Verify Docker Desktop/Engine is running    
3.  **Build failures**: Run `docker-compose down` and rebuild

# Check running containers
docker ps

# View container logs
docker-compose logs api
docker-compose logs frontend

# Remove all containers and volumes
docker-compose down -v    

## 🤝 Contributing
1.  Fork the repository    
2.  Create a feature branch    
3.  Make your changes    
4.  Test with `docker-compose up --build`    
5.  Submit a pull request

