package vn.diepgia.mchis.DebtManagement;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@OpenAPIDefinition(
		info = @Info(
				contact = @Contact(
						name = "Minh Chi Diep",
						email = "diepminhchi1617@gmail.com",
						url = "https://minhchi1709.github.io/mywebsite/index.html"
				),
				description = "OpenApi documentation for debt management",
				title = "OpenApi specification - Minh Chi Diep",
				version = "1.0",
				license = @License(
						name = "Licence name",
						url = "https://some-url.com"
				),
				termsOfService = "Terms of service"
		),
		servers = {
				@Server(
						description = "Local ENV",
						url = "http://localhost:8088"
				)
		},
		security = {
				@SecurityRequirement(
						name = "bearerAuth"
				)
		}
)
@SecurityScheme(
		name = "bearerAuth",
		description = "JWT auth description",
		scheme = "bearer",
		type = SecuritySchemeType.HTTP,
		bearerFormat = "JWT",
		in = SecuritySchemeIn.HEADER
)
@EnableMongoRepositories
@SpringBootApplication
public class DebtManagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(DebtManagementApplication.class, args);
	}

}
