resource "aws_subnet" "subnet01" {
    vpc_id = aws_vpc.vpc1.id
    cidr_block = "10.0.0.0/24"
    map_public_ip_on_launch = "true"
    availability_zone = "eu-central-1a"
    tags = {
        Name = "public-subnet"
    }
}
